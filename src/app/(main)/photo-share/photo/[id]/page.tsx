import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import CommentEditor from "./CommentEditor";
import styles from "./photoDetail.module.css";
import getToken from "@/lib/getToken";

export interface Photo {
  _id: string;
  file_name: string;
  date_time: Date;
  user_id: string;
  comments: Comment[];
  __v: number;
}

export interface Comment {
  comment: string;
  date_time: Date;
  user_id: string;
  _id: string;
}

interface Props {
  params: { id: string };
}

export default async function PhotoDetail({ params }: Props) {
  const TOKEN = await getToken();
  const axiosTOKEN = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axiosInstance.get(`/photos/${params.id}`, axiosTOKEN);
  const photo: Photo = response.data.data; // Assuming there's only one photo

  if (!photo) {
    return <div>No photo available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <article className={styles.article}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.title}>{photo.file_name}</div>
              <div className={styles.subtitle}>
                {new Date(photo.date_time).toLocaleDateString()}
              </div>
            </div>
            <div className={styles.headerRight}>Posted by {photo.user_id}</div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${photo.file_name}`} // Adjust the path as needed
              alt={photo.file_name}
              width={1000}
              height={50}
              className={styles.image}
            />
          </div>
          <CommentEditor id={photo._id} TOKEN={TOKEN!} />
          <div className={styles.commentsContainer}>
            {photo.comments.length > 0 ? (
              <div>
                <strong>Comments:</strong>
                <ul className={styles.commentsList}>
                  {photo.comments.map((comment) => (
                    <li key={comment._id} className={styles.commentItem}>
                      <div className={styles.commentUser}>
                        User {comment.user_id}:{" "}
                      </div>
                      <div>{comment.comment}</div>
                      <div className={styles.commentDate}>
                        {new Date(comment.date_time).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={styles.noComments}>No comments yet</div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
