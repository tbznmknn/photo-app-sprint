"use client";

import LoadingButton from "@/components/LoadingButton";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
export default function DeleteAccountButton({
  TOKEN,
  userId,
}: {
  TOKEN: string;
  userId: string;
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
        const response = await axiosInstance.delete(`/user`, axiosTOKEN);
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
        toast.success(`You have deleted the yourself`, {
          description: formattedDate,
        });
        Cookies.remove("TOKEN");
        // router.push("/login");
        window.location.reload();
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">DELETE MY ACCOUNT</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          <LoadingButton
            loading={isPending}
            onClick={handleDelete}
            variant="destructive"
            size="sm"
            title="Delete photo"
            className="hover:-translate-y-1 transition-all duration-300 h-9"
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
