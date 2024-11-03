import UserList from "./[userId]/UserList";
import styles from "./[userId]/PhotoShare.module.css";
interface Props {
  params: { userId: string };
}

export default function UserPage({ params }: Props) {
  return (
    <div className={styles.container}>
      {/* hi {params.userId} */}
      <div className={styles.userlist}>
        <UserList userId={params.userId} />
      </div>
      <div className={styles.userdetail}>
        {/* <UserDetail userId={params.userId} />
        <UserPhotos userId={params.userId} /> */}
      </div>
    </div>
  );
}
