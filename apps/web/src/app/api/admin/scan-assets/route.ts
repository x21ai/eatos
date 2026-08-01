// @ts-nocheck
// API Route: Scan codebase for all image URLs
// This scans all JSX/JS files and extracts https image URLs

import fs from "fs";
import path from "path";

// Known image hosting domains and patterns
const IMAGE_PATTERNS = [
  /https?:\/\/[^"'\s<>]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:[^"'\s<>]*)?/gi,
  /https?:\/\/(?:ucarecdn\.com|raw\.createusercontent\.com|framerusercontent\.com)[^"'\s<>]+/gi,
  /https?:\/\/[^"'\s<>]*urlbox[^"'\s<>]+/gi,
];

// Directories to scan
const SCAN_DIRS = ["/apps/web/src/app", "/apps/web/src/components"];

// Files/folders to skip
const SKIP_PATTERNS = [
  "node_modules",
  ".next",
  "admin/assets", // Don't scan ourselves
  ".test.",
  ".spec.",
];

function shouldSkip(filePath) {
  return SKIP_PATTERNS.some((pattern) => filePath.includes(pattern));
}

function extractImageUrls(content) {
  const urls = new Set();

  for (const pattern of IMAGE_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      for (const match of matches) {
        // Clean up the URL (remove trailing quotes, backticks, etc.)
        let cleanUrl = match
          .replace(/["'`<>]/g, "")
          .replace(/\)$/, "")
          .replace(/,$/, "");

        // Skip if it's a template literal variable
        if (cleanUrl.includes("${")) continue;

        urls.add(cleanUrl);
      }
    }
  }

  return Array.from(urls);
}

function scanDirectory(dir, results = []) {
  try {
    // Check if directory exists
    if (!fs.existsSync(dir)) {
      return results;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (shouldSkip(fullPath)) continue;

      if (entry.isDirectory()) {
        scanDirectory(fullPath, results);
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".jsx") || entry.name.endsWith(".js"))
      ) {
        try {
          const content = fs.readFileSync(fullPath, "utf-8");
          const urls = extractImageUrls(content);

          for (const url of urls) {
            results.push({
              url,
              location: fullPath.replace(/^.*\/apps\/web\/src\//, "/"),
              source: "codebase-scan",
            });
          }
        } catch (readErr) {
          console.error(`Error reading ${fullPath}:`, readErr.message);
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning ${dir}:`, err.message);
  }

  return results;
}

function inferAssetName(url, location) {
  // Try to get a meaningful name from the URL or location
  const urlParts = url.split("/");
  const filename =
    urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];

  // Clean up filename
  let name = filename
    .replace(/[-_]/g, " ")
    .replace(/\.[^.]+$/, "")
    .replace(/\?.*$/, "");

  // If name is too short or just a hash, use location
  if (name.length < 3 || /^[a-f0-9]+$/i.test(name)) {
    // Extract page name from location
    const pageName = location
      .replace(/\/page\.jsx$/, "")
      .replace(/\.jsx$/, "")
      .split("/")
      .pop();

    name = pageName ? `Image from ${pageName}` : "Unknown Image";
  }

  // Capitalize first letter of each word
  name = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return name;
}

function categorizeAsset(url) {
  if (url.includes("ucarecdn") || url.includes("logo")) return "Brand";
  if (url.includes("createusercontent")) return "Hero";
  if (url.includes("framerusercontent")) return "Hardware";
  if (url.includes("urlbox")) return "Product Reference";
  return "Other";
}

export async function GET() {
  try {
    const scannedAssets = [];

    // Scan each directory
    for (const dir of SCAN_DIRS) {
      // Adjust path for the actual filesystem
      const absolutePath = path.join(
        process.cwd(),
        dir.replace(/^\/apps\/web/, ""),
      );
      scanDirectory(absolutePath, scannedAssets);
    }

    // Deduplicate by URL
    const urlMap = new Map();
    for (const asset of scannedAssets) {
      if (!urlMap.has(asset.url)) {
        urlMap.set(asset.url, {
          ...asset,
          name: inferAssetName(asset.url, asset.location),
          category: categorizeAsset(asset.url),
          locations: [asset.location],
        });
      } else {
        // Add location to existing entry
        const existing = urlMap.get(asset.url);
        if (!existing.locations.includes(asset.location)) {
          existing.locations.push(asset.location);
        }
      }
    }

    const uniqueAssets = Array.from(urlMap.values()).map((asset) => ({
      ...asset,
      location:
        asset.locations.length > 1
          ? `${asset.locations.length} files`
          : asset.locations[0],
      locations: asset.locations,
    }));

    return Response.json({
      success: true,
      count: uniqueAssets.length,
      assets: uniqueAssets,
      scannedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error scanning assets:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
