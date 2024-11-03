import styles from "./PhotoShare.module.css";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { notFound } from "next/navigation";
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
      <div>
        <h1 className={styles.h1}>User photos</h1>
        {images.map((image) => (
          <Card key={image._id} className="w-[350px]">
            <CardHeader>
              <CardTitle>Photo</CardTitle>
              <CardDescription>
                {image.file_name} {image.date_time}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={`/images/${image.file_name}`}
                width={200}
                height={200}
                alt={image._id}
              />
            </CardContent>
            {/* <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter> */}
          </Card>
        ))}
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
      // Handle non-Axios errors here
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}
