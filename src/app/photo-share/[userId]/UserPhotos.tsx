// import { cs142models } from "@/model/photoData";
import styles from "./PhotoShare.module.css";
import Image from "next/image";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import fetchModel from "@/lib/fetchModelData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  // const images = cs142models.photoOfUserModel(userId);
  const url = `http://localhost:4000/api/v1/users/photosOfUser/${userId}`; // Replace with your API endpoint
  const response = await fetchModel(url);
  const images: UserImage[] = response.data.data;

  return (
    <div>
      <h1 className={styles.h1}>User photos</h1>
      {images.map((image) => (
        // <div key={image._id}>
        //   <div>{image.file_name}</div>
        //   <div>{image.date_time}</div>
        //   <Image
        //     src={`/images/${image.file_name}`}
        //     width={200}
        //     height={200}
        //     alt={image._id}
        //   />
        //   {/* <Image src={`/ripley1.jpg`} width={200} height={200} /> */}
        // </div>
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
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
