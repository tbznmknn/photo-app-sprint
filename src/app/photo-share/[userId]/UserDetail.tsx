import styles from "./PhotoShare.module.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import fetchModel from "@/lib/fetchModelData";
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

export default async function UserDetail({ userId }: Props) {
  const url = `http://localhost:4000/api/v1/users/${userId}`; // Replace with your API endpoint
  const response = await fetchModel(url);
  const user = response.data.data;

  if (!user) return <div>User not found</div>;
  return (
    <div>
      <h1 className={styles.h1}>User details</h1>
      <div className={styles.userdetailsplitter}>
        <UserDescriptions user={user} />
        {/* <div>
          <UserImage images={pictures} />
        </div> */}
      </div>
    </div>
  );
}

function UserDescriptions({ user }: { user: UserModel }) {
  return (
    <div>
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
