"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axiosInstance from "@/lib/axiosInstance";
import { CloudCog } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import getToken from "@/lib/getToken";
interface Comment {
  file_name: string;
  comment: string;
  date_time: string;
  id: string;
}
export default function SheetPhoto({
  count,
  userId,
  TOKEN,
}: {
  TOKEN: string;
  count: number;
  userId: string;
}) {
  const [data, setData] = useState<Comment[] | null>(null); // State to store fetched data
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const axiosTOKEN = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      };
      const response = await axiosInstance.get(
        `/user/comments/${userId}`,
        axiosTOKEN
      );
      console.log("response", response);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          onClick={fetchData}
          className="flex mt-1  items-center justify-center hover:bg-red-600 bg-red-500 rounded-full w-4 h-4"
        >
          <span
            title="photos"
            className="text-gray-200 text-[12px] font-medium"
          >
            {count}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>User's comments</SheetTitle>
          <SheetDescription>
            Listing {userId} user's all comments
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div>Loading...</div>
        ) : data && data.length > 0 ? (
          <div className="flex flex-col space-y-2">
            {data.map((comment) => (
              <div
                key={`${comment.file_name}-${comment.date_time}`}
                className="border rounded hover:bg-secondary p-2"
              >
                {/* <p>
                  <strong>File:</strong> {comment.file_name}
                </p> */}
                <Link href={`/photo-share/photo/${comment.id}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${comment.file_name}`} // Adjust the path as needed
                    alt={comment.file_name}
                    width={1000} // Adjust dimensions
                    height={50}
                    className="rounded hover:cursor-pointer"
                  />
                </Link>
                <p>
                  <strong>Comment:</strong> {comment.comment}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(comment.date_time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>No comments available.</div>
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" style={{ marginTop: "1rem" }}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
