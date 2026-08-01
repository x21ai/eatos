// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Download,
  ExternalLink,
  RefreshCw,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import { getAllManifestAssets } from "./manifest";

export default function AssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({});
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [lastScan, setLastScan] = useState(null);
  const [copied, setCopied] = useState(null);

  // Categories for filtering
  const categories = [
    "all",
    "Brand",
    "Hero",
    "Hardware",
    "Product Reference",
    "Other",
  ];

  // Load manifest assets immediately, then scan for additional
  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Load manifest assets (instant)
      const manifestAssets = getAllManifestAssets().map((a) => ({
        ...a,
        source: "manifest",
      }));

      setAssets(manifestAssets);
      setLoading(false);

      // Step 2: Scan codebase for additional assets
      await scanCodebase(manifestAssets);
    } catch (err) {
      console.error("Error loading assets:", err);
      setError("Failed to load assets");
      setLoading(false);
    }
  };

  const scanCodebase = async (existingAssets = []) => {
    setScanning(true);

    try {
      const response = await fetch("/api/admin/scan-assets");
      if (!response.ok) {
        throw new Error("Scan failed");
      }

      const data = await response.json();

      if (data.success && data.assets) {
        // Merge with existing, avoiding duplicates by URL
        const existingUrls = new Set(existingAssets.map((a) => a.url));
        const newAssets = data.assets.filter((a) => !existingUrls.has(a.url));

        setAssets([...existingAssets, ...newAssets]);
        setLastScan(data.scannedAt);
      }
    } catch (err) {
      console.error("Error scanning codebase:", err);
      // Don't show error - manifest assets are still available
    } finally {
      setScanning(false);
    }
  };

  const handleImageLoad = (url, e) => {
    setDimensions((prev) => ({
      ...prev,
      [url]: {
        width: e.target.naturalWidth,
        height: e.target.naturalHeight,
      },
    }));
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadImage = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name.replace(/\s+/g, "-").toLowerCase() + ".jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(url, "_blank");
    }
  };

  const downloadAll = async () => {
    for (const asset of filteredAssets) {
      await downloadImage(asset.url, asset.name);
      await new Promise((r) => setTimeout(r, 250));
    }
  };

  // Filter and search assets
  const filteredAssets = assets.filter((asset) => {
    const matchesFilter = filter === "all" || asset.category === filter;
    const matchesSearch =
      !search ||
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.location.toLowerCase().includes(search.toLowerCase()) ||
      asset.url.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Count by category
  const categoryCounts = assets.reduce((acc, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Asset Library</h1>
            <p className="text-gray-500 mt-2">
              All images used across the site, auto-discovered and curated.
              {lastScan && (
                <span className="text-gray-400 ml-2">
                  Last scan: {new Date(lastScan).toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                scanCodebase(assets.filter((a) => a.source === "manifest"))
              }
              disabled={scanning}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={scanning ? "animate-spin" : ""} />
              {scanning ? "Scanning..." : "Rescan"}
            </button>
            <button
              onClick={downloadAll}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Download all ({filteredAssets.length})
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, location, or URL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter size={16} className="text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === cat
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? "All" : cat}
                {cat !== "all" && categoryCounts[cat] && (
                  <span className="ml-1 opacity-60">
                    ({categoryCounts[cat]})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ImageIcon size={20} className="text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{assets.length}</div>
                <div className="text-sm text-gray-500">Total Assets</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {assets.filter((a) => a.source === "manifest").length}
                </div>
                <div className="text-sm text-gray-500">Curated</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Layers size={20} className="text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {assets.filter((a) => a.source === "codebase-scan").length}
                </div>
                <div className="text-sm text-gray-500">Discovered</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Filter size={20} className="text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {filteredAssets.length}
                </div>
                <div className="text-sm text-gray-500">Showing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertCircle size={20} className="text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Asset Grid */}
        {filteredAssets.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
            <p>No assets found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset, index) => (
              <div
                key={asset.url + index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image Preview */}
                <div className="relative h-48 bg-gray-100 flex items-center justify-center border-b border-gray-100 group">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "radial-gradient(#000 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="max-h-full max-w-full object-contain relative z-10"
                    onLoad={(e) => handleImageLoad(asset.url, e)}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%239ca3af'%3EError%3C/text%3E%3C/svg%3E";
                    }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      <ExternalLink size={14} />
                      Open Original
                    </a>
                  </div>

                  {/* Source Badge */}
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      asset.source === "manifest"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {asset.source === "manifest" ? "Curated" : "Discovered"}
                  </div>
                </div>

                {/* Asset Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-base leading-tight">
                        {asset.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                          asset.category === "Brand"
                            ? "bg-blue-100 text-blue-700"
                            : asset.category === "Hero"
                              ? "bg-orange-100 text-orange-700"
                              : asset.category === "Hardware"
                                ? "bg-gray-100 text-gray-700"
                                : asset.category === "Product Reference"
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {asset.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-mono break-all line-clamp-2">
                      {asset.location}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                          Dimensions
                        </span>
                        <span className="font-mono text-gray-900">
                          {dimensions[asset.url]
                            ? `${dimensions[asset.url].width} × ${dimensions[asset.url].height}px`
                            : "Loading..."}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs uppercase tracking-wider font-semibold mb-1">
                          Format
                        </span>
                        <span className="font-mono text-gray-900 uppercase">
                          {asset.url
                            .split(".")
                            .pop()
                            .split(/[?#]/)[0]
                            .slice(0, 4) || "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(asset.url)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          copied === asset.url
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {copied === asset.url ? (
                          <>
                            <CheckCircle size={16} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copy URL
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => downloadImage(asset.url, asset.name)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
