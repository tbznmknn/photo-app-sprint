import UserList from "./UserList";
import styles from "./container.module.css";
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
      <div className={styles.userDetailContainer}>
        <div className={styles.userDetailWrapper}>
          <UserDetail userId={params.userId} />
        </div>
        <div className={styles.userPhotosWrapper}>
          <UserPhotos userId={params.userId} />
        </div>
      </div>
    </div>
  );
  // export default function UserPage({ params }: Props) {
  //   return (
  //     <div className="flex flex-col justify-center mt-4 md:flex-row ">
  //       {/* hi {params.userId} */}
  //       <div className="w-[100%] ml-3  md:w-[30%]">
  //         <UserList userId={params.userId} />
  //       </div>
  //       <div className="flex flex-col mx-2 gap-3 md:flex-row justify-between w-[100%] md:w-[70%]">
  //         <div className="w-[300px]">
  //           <UserDetail userId={params.userId} />
  //         </div>
  //         <div className="flex-1">
  //           <UserPhotos userId={params.userId} />
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
//       {/* hi {params.userId} */}
//       <div className={styles.userlist}>
//         <UserList userId={params.userId} />
//       </div>
//       <div className="flex flex-col md:flex-row  gap-3">
//         <div className="w-[400px] ">
//           {" "}
//           {/* Set a fixed width for UserDetail */}
//           <UserDetail userId={params.userId} />
//         </div>
//         <div className="flex-grow">
//           {" "}
//           {/* UserPhotos takes remaining space */}
//           <UserPhotos userId={params.userId} />
//         </div>
//       </div>
//     </div>
//   );
// }
