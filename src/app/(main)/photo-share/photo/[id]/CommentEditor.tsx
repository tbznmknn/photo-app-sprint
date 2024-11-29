"use client";

import LoadingButton from "@/components/LoadingButton";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function CommentEditor({
  id,
  TOKEN,
}: {
  id: string;
  TOKEN: string;
}) {
  const [comment, setComment] = useState(""); // State to hold the comment input
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!comment.trim()) return;

    startTransition(async () => {
      try {
        const axiosTOKEN = {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        };
        const data = { comment };
        const response = await axiosInstance.post(
          `/commentsOfPhoto/${id}`,
          data,
          axiosTOKEN
        );
        console.log(response.data.data);
        setComment("");
        router.refresh();
      } catch (error: any) {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          console.error("Error headers:", error.response.headers);
        }
      }
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <strong>Add comment:</strong>
        <textarea
          className="w-full bg-background rounded-2xl mt-3 p-2"
          placeholder="What's on your mind"
          value={comment}
          onChange={handleChange}
        ></textarea>
        <div className="flex justify-end mt-3">
          <LoadingButton loading={isPending}>Add a comment</LoadingButton>
        </div>
      </div>
    </form>
  );
}
