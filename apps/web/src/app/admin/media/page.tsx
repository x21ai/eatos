// @ts-nocheck
"use client";

import { useState } from "react";
import MediaLibrary from "@/components/admin/MediaLibrary";
import { ArrowLeft } from "lucide-react";

export default function MediaPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A0A0A] border-b border-white/5 flex items-center gap-4 px-6 z-50">
        <a
          href="/admin/blog"
          className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} />
        </a>
        <h1 className="font-semibold text-lg">Media Library</h1>
      </header>

      <div className="pt-20 px-6 max-w-7xl mx-auto h-[calc(100vh-20px)]">
        {/* We reuse the MediaLibrary component but adapted for full page usage by hiding the modal wrapper if possible, 
             or just embedding it. Since MediaLibrary is built as a modal (fixed inset-0), 
             I should probably refactor it or just wrap it in a relative container if it supports it.
             
             Looking at MediaLibrary code: it has "fixed inset-0". 
             I will just render it. It has an onClose, which I can ignore or redirect.
             However, since it is a modal, it might look weird if I just drop it here.
             
             Actually, let's just make this page show a button to "Open Library" or just replicate the library UI.
             
             Better yet, let's just use the MediaLibrary component and pass an onClose that goes back.
         */}

        <MediaLibrary
          onSelect={(url) => {
            setSelectedImage(url);
            // Maybe copy to clipboard or show details
            navigator.clipboard.writeText(url);
            alert("Image URL copied to clipboard: " + url);
          }}
          onClose={() => (window.location.href = "/admin/blog")}
        />
      </div>
    </div>
  );
}
