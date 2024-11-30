import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import CommentEditor from "./CommentEditor";
import styles from "./photoDetail.module.css";
import getToken, { getSession } from "@/lib/getToken";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import DeleteCommentButton from "./DeleteComment";
import { Metadata } from "next";
export const metadata: Metadata = { title: "Photo" };
export interface Photo {
  _id: string;
  file_name: string;
  date_time: Date;
  user_id: string;
  comments: Comment[];
  likes: string[];
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
  const { id } = await params;
  const TOKEN = await getToken();
  const SESSION = await getSession();
  const axiosTOKEN = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axiosInstance
    .get(`/photos/${id}`, axiosTOKEN)
    .catch((err: any) => {
      notFound();
    });
  const photo: Photo = response.data.data; // Assuming there's only one photo
  console.log(photo);
  const isLiked = photo.likes.some((like) => like === SESSION?.id);
  console.log("is liked,", isLiked);
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
            <div className={styles.headerRight}>
              Posted by{" "}
              <Link
                className="text-blue-400"
                href={`/photo-share/${photo.user_id}`}
              >
                {photo.user_id}
              </Link>
            </div>
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
          <CommentEditor
            id={photo._id}
            TOKEN={TOKEN!}
            isLikedProp={isLiked}
            likesProp={photo.likes.length}
          />
          <div className={styles.commentsContainer}>
            {photo.comments.length > 0 ? (
              <div>
                <strong className="mb-2">Comments:</strong>
                <ul className={styles.commentsList}>
                  {photo.comments.map((comment) => {
                    const isOwner = comment.user_id === SESSION?.id;
                    const date = new Date();
                    const formattedDate = date.toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    });
                    return (
                      <li key={comment._id} className={styles.commentItem}>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <div className={styles.commentUser}>
                            User {comment.user_id}{" "}
                            <span className={styles.commentDate}>
                              {" "}
                              {formattedDate}
                            </span>
                            :{" "}
                          </div>
                          {isOwner && (
                            <DeleteCommentButton
                              TOKEN={TOKEN!}
                              commentId={comment._id}
                            />
                          )}
                        </div>
                        <div>{comment.comment}</div>
                        {/* <div className={styles.commentDate}>
                          {formattedDate}
                        </div> */}
                      </li>
                    );
                  })}
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
