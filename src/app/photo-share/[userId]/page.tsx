import UserList from "./UserList";
import styles from "./PhotoShare.module.css";
import UserDetail from "./UserDetail";
import UserPhotos from "./UserPhotos";
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
        <UserDetail userId={params.userId} />
        <UserPhotos userId={params.userId} />
      </div>
    </div>
  );
}
