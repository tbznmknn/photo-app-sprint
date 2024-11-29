"use client";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

export default function AddPhoto({ TOKEN }: { TOKEN: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const axiosTOKEN = {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axiosInstance.post(
          "/photos/new",
          formData,
          axiosTOKEN
        );
        console.log(response.data);
        router.refresh(); // Refresh or redirect after the upload completes
        setSelectedFile(null); // Clear the selected file after upload
      } catch (error: any) {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <LoadingButton loading={isPending}>Upload</LoadingButton>
      </div>
    </form>
  );
}
