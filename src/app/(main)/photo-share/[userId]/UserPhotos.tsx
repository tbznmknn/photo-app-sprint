import styles from "./PhotoShare.module.css";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  userId: string;
}

export interface UserImage {
  _id: string;
  date_time: string;
  file_name: string;
  user_id: string;
}

export default async function UserPhoto({ userId }: Props) {
  try {
    const response = await axiosInstance.get(`/user/photosOfUser/${userId}`);
    console.log(response.data);
    const images: UserImage[] = response.data.data;

    return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h1 className={styles.h1}>User photos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {images.map((image) => (
            <Card
              key={image._id}
              className="w-full hover:bg-muted hover:cursor-pointer"
            >
              <CardHeader>
                <CardTitle>Photo</CardTitle>
                <CardDescription>
                  {image.file_name}{" "}
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
                    className="object-cover w-full h-auto"
                  />
                </Link>
              </CardContent>
            </Card>
          ))}
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
