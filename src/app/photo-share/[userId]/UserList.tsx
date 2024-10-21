// import { cs142models } from "@/model/photoData";
import styles from "./PhotoShare.module.css";
import Link from "next/link";
import fetchModel from "@/lib/fetchModelData";
type UserList = {
  _id: string;
  first_name: string;
  last_name: string;
  location: string;
  description: string;
  occupation: string;
};
export default async function UserList({ userId }: { userId: string }) {
  // const users = cs142models.userListModel();
  const url = `http://localhost:4000/api/v1/users/list`; // Replace with your API endpoint
  const response = await fetchModel(url);
  const users: UserList[] = response.data.data;
  // console.log("response is", response);
  console.log(users);
  return (
    <div>
      <h1 className={styles.h1}>User Lists</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user._id} className={styles.link}>
              <Link
                href={user._id}
                style={
                  userId === user._id
                    ? { fontWeight: "bold" }
                    : { fontWeight: "normal" }
                }
              >
                {user.first_name} {user.last_name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
