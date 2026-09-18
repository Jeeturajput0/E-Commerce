import { X, UploadCloud, Loader2, ImagePlus } from "lucide-react";
import { useRef, useState } from "react";
import { resolveImage } from "../../lib/api";
import { FOLDERS, deleteFromImageKit, uploadToImageKit } from "../../services/upload.service";

// Reusable ImageKit uploader: preview, multiple, remove/replace, progress, loading + error states.
// Value: array of { url, fileId, filePath }. Parent saves these to MongoDB via product/category APIs.
const ImageUploader = ({
  value = [],
  onChange,
  folder = FOLDERS.products,
  multiple = true,
  maxFiles = 6,
  label = "Product images",
}) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const files = Array.isArray(value) ? value : value ? [value] : [];

  const addFiles = async (selected) => {
    setError("");
    const list = [...selected].filter((f) => f.type.startsWith("image/"));
    if (!list.length) {
      setError("Please select valid image files");
      return;
    }
    if (files.length + list.length > maxFiles) {
      setError(`You can upload up to ${maxFiles} images`);
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const uploaded = [];
      for (const file of list) {
        // eslint-disable-next-line no-await-in-loop
        const result = await uploadToImageKit(file, folder, setProgress);
        uploaded.push(result);
      }
      onChange?.(multiple ? [...files, ...uploaded] : uploaded.slice(-1));
    } catch (e) {
      setError(e.message || "Upload failed. Check ImageKit configuration.");
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = async (index) => {
    const target = files[index];
    const next = files.filter((_, i) => i !== index);
    onChange?.(next);
    // Also remove from ImageKit so orphaned files don't pile up
    if (target?.fileId) {
      try {
        await deleteFromImageKit(target.fileId);
      } catch {
        // best effort
      }
    }
  };

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">
          {label} <span className="font-normal text-slate-400">({files.length}/{maxFiles})</span>
        </p>
        {uploading && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary-600">
            <Loader2 className="h-4 w-4 animate-spin" /> Uploading {progress}%
          </span>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {files.map((img, index) => (
            <div key={img.fileId || img.url || index} className="group relative overflow-hidden rounded-xl border">
              <img
                src={resolveImage(img)}
                alt={`upload-${index}`}
                className="h-24 w-full object-cover"
                onError={(e) => { e.currentTarget.src = "/logo.jpg"; }}
              />
              {index === 0 && (
                <span className="absolute left-1 top-1 rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                title="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={uploading || files.length >= maxFiles}
        onClick={() => inputRef.current?.click()}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-6 text-sm font-semibold text-slate-500 transition hover:border-primary-500 hover:text-primary-600 disabled:opacity-50"
      >
        {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : files.length ? <ImagePlus className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
        {uploading ? `Uploading... ${progress}%` : files.length ? "Add more images" : "Click to upload images (ImageKit)"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => addFiles(e.target.files || [])}
      />
      {uploading && (
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full bg-primary-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
      {error && <p className="text-sm text-rose-600">{error}</p>}
    </div>
  );
};

export default ImageUploader;
