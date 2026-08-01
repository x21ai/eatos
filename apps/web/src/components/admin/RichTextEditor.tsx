// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Link,
  Image as ImageIcon,
  Heading1,
  Heading2,
  List,
  Quote,
  Sparkles,
  Code,
  Type,
} from "lucide-react";
import { toast } from "sonner";
import MediaLibrary from "./MediaLibrary";

export default function RichTextEditor({ value, onChange }) {
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (
      editorRef.current &&
      editorRef.current.innerHTML !== value &&
      !isHtmlMode
    ) {
      if (!editorRef.current.innerHTML && value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [isHtmlMode]); // Add isHtmlMode dependency to refresh content when switching back

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleHtmlChange = (e) => {
    onChange(e.target.value);
  };

  const handleInsertImage = (url) => {
    exec("insertImage", url);
    setShowMediaLibrary(false);
  };

  const handleAiAction = async (type, prompt = "") => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (type === "rewrite" && !selectedText) {
      toast.error("Select text to rewrite");
      return;
    }

    const toastId = toast.loading("AI working...");

    try {
      const res = await fetch("/api/ai/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          content: selectedText,
          prompt,
        }),
      });

      const data = await res.json();

      if (data.text) {
        if (type === "rewrite") {
          exec("insertText", data.text);
        } else {
          const html = `<p>${data.text.replace(/\n/g, "<br/>")}</p>`;
          exec("insertHTML", html);
        }
        toast.success("Done!");
      } else {
        toast.error("Failed to generate");
      }
    } catch (e) {
      toast.error("Error connecting to AI");
    } finally {
      toast.dismiss(toastId);
      setShowAiModal(false);
    }
  };

  return (
    <div className="flex flex-col border border-white/10 rounded-xl overflow-hidden bg-[#111]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-[#161616]">
        {!isHtmlMode && (
          <>
            <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
              <select
                onChange={(e) => exec("fontName", e.target.value)}
                className="bg-transparent text-gray-400 text-xs border border-white/10 rounded px-1 py-1 focus:outline-none focus:border-white/30"
                defaultValue=""
              >
                <option value="" disabled>
                  Font
                </option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Mono</option>
                <option value="Times New Roman">Times</option>
              </select>
              <select
                onChange={(e) => exec("fontSize", e.target.value)}
                className="bg-transparent text-gray-400 text-xs border border-white/10 rounded px-1 py-1 focus:outline-none focus:border-white/30"
                defaultValue=""
              >
                <option value="" disabled>
                  Size
                </option>
                <option value="1">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
                <option value="7">Huge</option>
              </select>
            </div>
            <ToolbarButton
              onClick={() => exec("bold")}
              icon={<Bold size={16} />}
              tooltip="Bold"
            />
            <ToolbarButton
              onClick={() => exec("italic")}
              icon={<Italic size={16} />}
              tooltip="Italic"
            />
            <div className="w-px h-4 bg-white/10 mx-1" />
            <ToolbarButton
              onClick={() => exec("formatBlock", "H2")}
              icon={<Heading1 size={16} />}
              tooltip="Heading"
            />
            <ToolbarButton
              onClick={() => exec("formatBlock", "H3")}
              icon={<Heading2 size={16} />}
              tooltip="Subheading"
            />
            <div className="w-px h-4 bg-white/10 mx-1" />
            <ToolbarButton
              onClick={() => exec("insertUnorderedList")}
              icon={<List size={16} />}
              tooltip="List"
            />
            <ToolbarButton
              onClick={() => exec("formatBlock", "blockquote")}
              icon={<Quote size={16} />}
              tooltip="Quote"
            />
            <div className="w-px h-4 bg-white/10 mx-1" />
            <ToolbarButton
              onClick={() => {
                const url = prompt("Enter link URL:");
                if (url) exec("createLink", url);
              }}
              icon={<Link size={16} />}
              tooltip="Link"
            />
            <ToolbarButton
              onClick={() => setShowMediaLibrary(true)}
              icon={<ImageIcon size={16} />}
              tooltip="Insert Image"
            />
          </>
        )}

        <div className="flex-1" />

        <button
          onClick={() => setIsHtmlMode(!isHtmlMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${isHtmlMode ? "bg-white/20 text-white" : "hover:bg-white/10 text-gray-400"}`}
          title="Edit HTML Source"
        >
          <Code size={14} /> {isHtmlMode ? "Visual Editor" : "HTML"}
        </button>

        {!isHtmlMode && (
          <button
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-medium transition-colors ml-2"
          >
            <Sparkles size={14} /> AI Tools
          </button>
        )}
      </div>

      {/* Editor Area */}
      {isHtmlMode ? (
        <textarea
          value={value}
          onChange={handleHtmlChange}
          className="flex-1 min-h-[500px] p-6 text-gray-300 font-mono text-sm bg-[#0A0A0A] focus:outline-none resize-y"
          placeholder="Enter HTML here..."
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          className="flex-1 min-h-[500px] p-6 text-gray-300 font-sans focus:outline-none prose prose-invert max-w-none"
          onInput={handleChange}
          dangerouslySetInnerHTML={{ __html: value }}
          style={{ whiteSpace: "pre-wrap" }}
        />
      )}

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <MediaLibrary
          onSelect={handleInsertImage}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}

      {/* AI Tools Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111] w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="text-indigo-400" /> AI Assistant
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => handleAiAction("rewrite")}
                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
              >
                <div className="font-medium text-white">Rewrite Selection</div>
                <div className="text-xs text-gray-500">
                  Improve clarity and tone of selected text
                </div>
              </button>

              <button
                onClick={() => handleAiAction("expand")}
                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
              >
                <div className="font-medium text-white">Expand Selection</div>
                <div className="text-xs text-gray-500">
                  Add more detail to the selected text
                </div>
              </button>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-medium text-gray-400 mb-2">
                  Generate New Content
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAiAction("generate", e.target.prompt.value);
                  }}
                >
                  <div className="flex gap-2">
                    <input
                      name="prompt"
                      placeholder="Write a paragraph about..."
                      className="flex-1 bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold"
                    >
                      Go
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <button
              onClick={() => setShowAiModal(false)}
              className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({ onClick, icon, tooltip }) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
    >
      {icon}
    </button>
  );
}
