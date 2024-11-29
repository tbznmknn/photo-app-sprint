import styles from "./PhotoShare.module.css";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { notFound } from "next/navigation";
import SheetPhoto from "./SheetPhoto";
import getToken from "@/lib/getToken";
type UserList = {
  _id: string;
  first_name: string;
  last_name: string;
  location: string;
  description: string;
  occupation: string;
  numComments: number;
  numPhotos: number;
};
export default async function UserList({ userId }: { userId: string }) {
  try {
    const TOKEN = await getToken();
    const axiosTOKEN = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    const response = await axiosInstance.get(`/user/list`, axiosTOKEN);
    const users: UserList[] = response.data.data;
    return (
      <div>
        <h1 className={styles.h1}>User Lists</h1>
        <ul>
          {users.map((user) => {
            return (
              <li key={user._id} className={styles.link}>
                <Link
                  href={`/photo-share/${user._id}`}
                  style={
                    userId === user._id
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {user.first_name} {user.last_name}
                </Link>
                <div className={styles.custom_button}>
                  <span
                    title="photos"
                    className="text-black text-[12px] font-medium"
                  >
                    {user.numPhotos}
                  </span>
                </div>

                <SheetPhoto
                  userId={user._id}
                  count={user.numComments}
                  TOKEN={TOKEN}
                />
              </li>
            );
          })}
        </ul>
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
