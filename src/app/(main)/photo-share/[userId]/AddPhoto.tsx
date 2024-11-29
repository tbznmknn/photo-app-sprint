"use client";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
        router.refresh();
        const date = new Date();
        const formattedDate = date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        toast.success(`You have uploaded a photo`, {
          description: formattedDate,
        });
        setSelectedFile(null);
      } catch (error: any) {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <strong>Add photo:</strong>

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
