import styles from "./PhotoShare.module.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import fetchModel from "@/lib/fetchModelData";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { notFound } from "next/navigation";
import getToken from "@/lib/getToken";
// import Image from "next/image";
interface Props {
  userId: string;
}
export interface UserModel {
  _id: string;
  first_name: string;
  last_name: string;
  location: string;
  description: string;
  occupation: string;
}
export const getServerSideProps = async () => {
  // Fetch data from external API
};

export default async function UserDetail({ userId }: Props) {
  try {
    const TOKEN = await getToken();
    const axiosTOKEN = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    const response = await axiosInstance.get(`/user/${userId}`, axiosTOKEN);

    const user = response.data.data;

    if (!user) return <div>User not found</div>;
    return (
      <div className="w-full">
        <h1 className={styles.h1}>User details</h1>
        <div className={styles.userdetailsplitter}>
          <UserDescriptions user={user} />
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

function UserDescriptions({ user }: { user: UserModel }) {
  return (
    <div className="w-full ">
      <div className={styles.userinput}>
        <Label htmlFor="email">First Name</Label>
        <Input value={user.first_name} placeholder="Email" />
      </div>
      <div className={styles.userinput}>
        <Label htmlFor="email">Last Name</Label>
        <Input value={user.last_name} placeholder="Last Name" />
      </div>
      <div className={styles.userinput}>
        <Label htmlFor="email">Occupation</Label>
        <Input value={user.occupation} placeholder="Occupation" />
      </div>
      <div className={styles.userinput}>
        <Label htmlFor="email">Location</Label>
        <Input value={user.location} placeholder="Location" />
      </div>
      <div className={styles.userinput}>
        <Label htmlFor="email">Description</Label>
        <Textarea
          id="email"
          value={user.description}
          placeholder="Description"
        />
      </div>
    </div>
  );
}
