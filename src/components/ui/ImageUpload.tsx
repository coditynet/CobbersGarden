"use client";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
  existingImages?: string[];
}

const ImageUpload = ({ onImagesChange, maxImages = 3, existingImages = [] }: ImageUploadProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(existingImages);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).slice(0, maxImages - previewUrls.length).filter(
      file => file.type.startsWith('image/')
    );

    if (validFiles.length > 0) {
      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
      onImagesChange(validFiles);
    }
  };

  const removeImage = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    onImagesChange([]);
  };

  return (
    <div className="space-y-4">
      {previewUrls.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-xl p-8 transition-colors ${
            dragActive ? 'border-garden-accent bg-garden-background/10' : 'border-gray-300'
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          <label className="flex flex-col items-center cursor-pointer">
            <Upload className="w-10 h-10 text-garden-primary mb-2" />
            <span className="text-garden-primary font-medium">
              Bilder hierher ziehen oder klicken zum Auswählen
            </span>
            <span className="text-sm text-garden-secondary mt-1">
              Max. {maxImages} Bilder (JPG, PNG)
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </label>
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previewUrls.map((url, index) => (
            <div key={url} className="relative aspect-square">
              <Image
                src={url}
                alt={`Uploaded image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 