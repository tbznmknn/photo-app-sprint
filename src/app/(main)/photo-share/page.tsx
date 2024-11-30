import { Metadata } from "next";
import UserList from "../photo-share/[userId]/UserList";
import styles from "../photo-share/[userId]/container.module.css";
export const metadata: Metadata = { title: "User Lists" };
interface Props {
  params: { userId: string };
}

export default async function UserPage({ params }: Props) {
  const { userId } = await params;
  return (
    <div className={styles.container}>
      {/* hi {userId} */}
      <div className={styles.userlist}>
        <UserList userId={userId} />
      </div>
      <div className={styles.userDetailContainer}>
        <div className={styles.userDetailWrapper}>
          {/* <UserDetail userId={userId} /> */}
        </div>
        <div className={styles.userPhotosWrapper}>
          {/* <UserPhotos userId={userId} /> */}
        </div>
      </div>
    </div>
  );
  // export default function UserPage({ params }: Props) {
  //   return (
  //     <div className="flex flex-col justify-center mt-4 md:flex-row ">
  //       {/* hi {userId} */}
  //       <div className="w-[100%] ml-3  md:w-[30%]">
  //         <UserList userId={userId} />
  //       </div>
  //       <div className="flex flex-col mx-2 gap-3 md:flex-row justify-between w-[100%] md:w-[70%]">
  //         <div className="w-[300px]">
  //           <UserDetail userId={userId} />
  //         </div>
  //         <div className="flex-1">
  //           <UserPhotos userId={userId} />
  //         </div>
  //       </div>
  //     </div>
  //   );
}
// import UserList from "./UserList";
// import styles from "./PhotoShare.module.css";
// import UserDetail from "./UserDetail";
// import UserPhotos from "./UserPhotos";
// interface Props {
//   params: { userId: string };
// }

// export default function UserPage({ params }: Props) {
//   return (
//     <div className={styles.container}>
//       {/* hi {userId} */}
//       <div className={styles.userlist}>
//         <UserList userId={userId} />
//       </div>
//       <div className="flex flex-col md:flex-row  gap-3">
//         <div className="w-[400px] ">
//           {" "}
//           {/* Set a fixed width for UserDetail */}
//           <UserDetail userId={userId} />
//         </div>
//         <div className="flex-grow">
//           {" "}
//           {/* UserPhotos takes remaining space */}
//           <UserPhotos userId={userId} />
//         </div>
//       </div>
//     </div>
//   );
// }
