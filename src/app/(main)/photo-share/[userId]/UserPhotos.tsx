import styles from "./PhotoShare.module.css";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { notFound } from "next/navigation";
import Link from "next/link";
import getToken, { getSession } from "@/lib/getToken";
import AddPhoto from "./AddPhoto";
import { ThumbsUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import DeletePhotoButton from "./DeletePhoto";

interface Props {
  userId: string;
}

export interface UserImage {
  _id: string;
  date_time: string;
  file_name: string;
  user_id: string;
  likes: string[];
}

export default async function UserPhoto({ userId }: Props) {
  try {
    const TOKEN = await getToken();
    const SESSION = await getSession();
    const isOwner = SESSION?.id === userId;

    const axiosTOKEN = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    const response = await axiosInstance.get(
      `/user/photosOfUser/${userId}`,
      axiosTOKEN
    );
    console.log(response.data);
    const images: UserImage[] = response.data.data;

    return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h1 className={styles.h1}>User photos</h1>
        {isOwner && <AddPhoto TOKEN={TOKEN!} />}
        <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {images.map((image) => {
            const isLiked = image.likes.some((like) => like === SESSION?.id);
            return (
              <Card key={image._id} className="w-full hover:bg-muted ">
                <CardHeader>
                  <CardTitle>
                    <div className="flex justify-between">
                      <span>Photo</span>
                      <div className="flex  justify-center gap-4">
                        {isOwner && (
                          <DeletePhotoButton
                            TOKEN={TOKEN!}
                            photoId={image._id}
                          />
                        )}

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="cursor-help">
                                <ThumbsUp
                                  className={`${
                                    isLiked ? `text-blue-400` : `text-gray-400`
                                  } }`}
                                  size={24}
                                />
                                <span className="font-extralight text-sm relative bottom-1 left-5 bg-primary p-1 w-4 h-4 flex items-center justify-center text-white rounded-full ">
                                  {image.likes.length}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              className={`${isLiked ? "" : "bg-gray-300"}`}
                            >
                              <p>
                                You {isLiked ? "liked" : "did not like"} this
                                post
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <span className="break-words">{image.file_name} </span>
                    {new Date(image.date_time).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/photo-share/photo/${image._id}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${image.file_name}`}
                      width={400}
                      height={250}
                      alt={image._id}
                      className="object-cover w-full h-auto hover:cursor-pointer hover:-translate-y-2 transition-all duration-300 delay-150"
                    />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) {
        console.error("User not found");
        notFound();
        return <div>user not found</div>;
      } else if (status === 500) {
        console.error("Server error - please try again later");
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}
