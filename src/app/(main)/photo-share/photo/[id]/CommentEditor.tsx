"use client";

import LoadingButton from "@/components/LoadingButton";
import axiosInstance from "@/lib/axiosInstance";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
export default function CommentEditor({
  id,
  TOKEN,
  isLikedProp,
  likesProp,
}: {
  id: string;
  isLikedProp: boolean;
  likesProp: number;
  TOKEN: string;
}) {
  const [comment, setComment] = useState(""); // State to hold the comment input
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likes, setLikes] = useState(likesProp);
  const [isPendingLike, startTransitionLike] = useTransition();
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
        const date = new Date();
        const formattedDate = date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        setComment("");
        router.refresh();
        toast.success(`You have added comment to the post`, {
          description: formattedDate,
        });
      } catch (error: any) {
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          console.error("Error headers:", error.response.headers);
        }
      }
    });
  }
  async function handleLike() {
    startTransitionLike(async () => {
      try {
        const axiosTOKEN = {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        };
        const response = await axiosInstance.post(
          `/photos/${id}`,
          {},
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
        toast.success(`You have ${isLiked ? "liked" : "unliked"} the post`, {
          description: formattedDate,
          // description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => {
              console.log("Undo");
              handleLike();
            },
          },
        });
        setIsLiked((i) => (i = !i));
        setLikes((i) => (i = response.data.data.likes));
        // router.refresh();
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
        <div className="flex justify-between ">
          <div className="flex items-center gap-2">
            <LoadingButton
              loading={isPendingLike}
              type="button"
              variant={"ghost"}
              onClick={handleLike}
            >
              <ThumbsUp
                className={isLiked ? "text-blue-400" : "text-gray-400"}
                size={24}
              />
              Like
            </LoadingButton>
            <div className="text-">{likes} Likes</div>
          </div>
          <LoadingButton loading={isPending}>Add a comment</LoadingButton>
        </div>
      </div>
    </form>
  );
}
