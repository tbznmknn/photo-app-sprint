"use client";

import LoadingButton from "@/components/LoadingButton";
import axiosInstance from "@/lib/axiosInstance";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteCommentButton({
  TOKEN,
  commentId,
}: {
  TOKEN: string;
  commentId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleDelete() {
    startTransition(async () => {
      try {
        const axiosTOKEN = {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        };
        const response = await axiosInstance.delete(
          `/commentsOfPhoto/${commentId}`,
          axiosTOKEN
        );
        console.log(response.data.data);
        const isLiked = response.data.data.action === "Like";
        const date = new Date();
        const formattedDate = date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        router.refresh();
        toast(`You have deleted the comment`, {
          description: formattedDate,
        });
      } catch (error: any) {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          console.error("Error headers:", error.response.headers);
          const date = new Date();
          const formattedDate = date.toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          toast.error(`You can not delete the comment`, {
            description: formattedDate,
          });
        }
      }
    });
  }
  return (
    <LoadingButton
      loading={isPending}
      onClick={handleDelete}
      variant="destructive"
      size="sm"
      title="Delete comment"
      className="hover:translate-y-[-0.2rem] transition-all duration-300 "
    >
      <Trash />
    </LoadingButton>
  );
}
