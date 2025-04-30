"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { updateAccount } from "@/lib/actions/auth.actions";
import useAuthStore from "@/store/useAuthStore";
import { Check, CircleX, Loader2 } from "lucide-react";
import Preview from "@/public/image_preview.webp";

export default function PhotoPage() {
  const { user } = useAuthStore();

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    mutate: handleUpdateSettings,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const data = await updateAccount(user._id, formData);
      if (data.error) return Promise.reject(data);
      return data;
    },
    onError: (errorData) => {
      console.log(errorData);
      setErrors(errorData.errors || {});
    },
  });

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const imageURL = URL.createObjectURL(selectedFile);
    setPreview(imageURL);
    setFile(selectedFile);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadForm,
    });

    const data = await res.json();
    setUploading(false);

    if (res.ok && data.secure_url) {
      const formData = new FormData();
      formData.append("picture", data.secure_url);
      handleUpdateSettings(formData);
    } else {
      alert("Image upload failed");
      console.error(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-3 space-y-4 flex flex-col items-start"
    >
      <h1 className="text-xl font-medium">Photo</h1>
      <Label>Image preview</Label>
      <p className="text-sm">
        This is the image that will be displayed in your profile.
      </p>
      <Separator className="my-4" />

      <div className="w-full p-4 grid place-items-center border rounded-md mt-2 mb-4">
        {preview ? (
          <Image src={preview} alt="image preview" width={200} height={200} />
        ) : (
          <Image src={Preview} width={200} height={200} alt="No image" />
        )}
      </div>

      <Label>Image to add / change</Label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      <Button
        type="submit"
        disabled={uploading || isPending || !file || isSuccess}
      >
        {(uploading || isPending) && <Loader2 className="animate-spin mr-2" />}
        {isSuccess && <Check className="mr-2" />}
        {isError && <CircleX className="mr-2" />}
        Save Changes
      </Button>
    </form>
  );
}
