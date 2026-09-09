// @ts-nocheck
import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  Upload,
  Image as ImageIcon,
  Sparkles,
  X,
  Check,
  Link as LinkIcon,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";

export default function MediaLibrary({ onSelect, onClose }) {
  const [activeTab, setActiveTab] = useState("library"); // library | upload | url | ai
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  // Optimization State
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [optimizeSettings, setOptimizeSettings] = useState({
    maxWidth: 1200,
    quality: 80,
    format: "image/jpeg",
  });

  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch recent shop uploads from R2 (admin uploads API)
  const { data: media = [], isLoading } = useQuery({
    queryKey: ["media-library"],
    queryFn: async () => {
      const res = await fetch("/api/admin/uploads?limit=100");
      if (!res.ok) throw new Error("Failed to fetch media");
      const json = await res.json();
      const items = Array.isArray(json?.data) ? json.data : [];
      return items.map((item, index) => ({
        id: item.key || item.url || String(index),
        url: item.url,
        filename: item.key?.split("/").pop() || "image",
      }));
    },
  });

  // Persist URL imports / AI gens into legacy media table when available
  const saveMediaMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save media");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["media-library"]);
      setActiveTab("library");
    },
  });

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFile(file);
    setActiveTab("optimize");
  };

  const processAndUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);

      // Compress/Resize logic
      const processedFile = await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = previewUrl;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxWidth = parseInt(optimizeSettings.maxWidth) || 1200;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error("Canvas error"));
              resolve(
                new File(
                  [blob],
                  selectedFile.name.replace(/\.[^/.]+$/, ".jpg"),
                  {
                    type: "image/jpeg",
                  },
                ),
              );
            },
            "image/jpeg",
            optimizeSettings.quality / 100,
          );
        };
        img.onerror = reject;
      });

      const formData = new FormData();
      formData.append("file", processedFile);
      formData.append("product_slug", "misc");

      const uploadRes = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      const uploadJson = await uploadRes.json().catch(() => ({}));
      if (!uploadRes.ok) {
        throw new Error(
          uploadJson?.message || uploadJson?.error || "Upload failed",
        );
      }
      const url = uploadJson?.data?.url;
      if (!url) throw new Error("Upload failed: no URL returned");

      queryClient.invalidateQueries(["media-library"]);
      setActiveTab("library");
      toast.success("Image uploaded!");
      onSelect(url);
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
      setSelectedFile(null);
    }
  };

  const handleUrlImport = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get("url");
    if (!url) return;

    await saveMediaMutation.mutateAsync({
      url,
      filename: "imported-image",
      mime_type: "image/unknown",
    });

    toast.success("Image URL imported!");
    onSelect(url);
  };

  // AI Generation
  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    try {
      setGenerating(true);
      const res = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();

      if (data.url) {
        // Save the generated URL to our library
        await saveMediaMutation.mutateAsync({
          url: data.url,
          filename: `ai-gen-${Date.now()}.png`,
          mime_type: "image/png",
          alt_text: aiPrompt,
        });
        toast.success("Image generated!");
      }
    } catch (err) {
      toast.error("Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111] w-full max-w-4xl max-h-[85vh] rounded-2xl border border-white/10 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Media Library</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 overflow-x-auto">
          {["library", "upload", "url", "ai"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              disabled={activeTab === "optimize"} // Disable switching when optimizing
              className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white/10 text-white border-b-2 border-indigo-500"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab === "library" && "Library"}
              {tab === "upload" && "Upload New"}
              {tab === "url" && "Import URL"}
              {tab === "ai" && "AI Generator"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[400px]">
          {activeTab === "library" && (
            <>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="animate-spin text-gray-500" />
                </div>
              ) : media.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No images found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {media.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.url)}
                      className="group relative aspect-square bg-[#050505] rounded-xl overflow-hidden border border-white/10 hover:border-indigo-500 transition-all"
                    >
                      <img
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Check className="text-white" size={24} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "upload" && (
            <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-white/10 rounded-xl p-10 hover:border-white/20 transition-colors">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/png, image/jpeg, image/gif, image/webp"
              />
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-indigo-400">
                <Upload />
              </div>
              <p className="text-lg font-medium text-white mb-2">
                Click to select image
              </p>
              <p className="text-sm text-gray-500 mb-6">
                JPG, PNG, GIF, WEBP up to 5MB
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Select File
              </button>
            </div>
          )}

          {activeTab === "optimize" && selectedFile && (
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="aspect-video bg-black/50 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center mb-2">
                    <img
                      src={previewUrl}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    Original: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Settings2 size={18} /> Optimization Settings
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">
                          Max Width (px)
                        </label>
                        <input
                          type="number"
                          value={optimizeSettings.maxWidth}
                          onChange={(e) =>
                            setOptimizeSettings({
                              ...optimizeSettings,
                              maxWidth: e.target.value,
                            })
                          }
                          className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-white"
                        />
                        <p className="text-xs text-gray-600">
                          Resizes image if wider than this value.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">
                          Quality ({optimizeSettings.quality}%)
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={optimizeSettings.quality}
                          onChange={(e) =>
                            setOptimizeSettings({
                              ...optimizeSettings,
                              quality: e.target.value,
                            })
                          }
                          className="w-full accent-indigo-500"
                        />
                        <p className="text-xs text-gray-600">
                          Lower quality = smaller file size.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setActiveTab("upload");
                        setSelectedFile(null);
                      }}
                      className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={processAndUpload}
                      disabled={uploading}
                      className="flex-1 px-4 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {uploading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Upload size={18} />
                      )}
                      Upload & Use
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "url" && (
            <form
              onSubmit={handleUrlImport}
              className="flex flex-col items-center justify-center h-full max-w-lg mx-auto space-y-6"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-indigo-400">
                <LinkIcon />
              </div>
              <div className="w-full space-y-2">
                <label className="text-sm font-medium text-white">
                  Image URL
                </label>
                <input
                  name="url"
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Import URL
              </button>
            </form>
          )}

          {activeTab === "ai" && (
            <div className="max-w-xl mx-auto space-y-6 py-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Prompt
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="A futuristic city with neon lights..."
                  className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none min-h-[100px]"
                />
              </div>
              <button
                onClick={handleAiGenerate}
                disabled={generating || !aiPrompt}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {generating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
                Generate Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
