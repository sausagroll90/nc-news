import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId } from "../modules/api-requests";
import CommentCard from "./CommentCard";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    async function fetchComments() {
      const { comments } = await getCommentsByArticleId(article_id);
      setComments(comments);
    }
    fetchComments();
  }, []);

  return (
    <article className="comment-section">
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => {
          const date = comment.created_at.split("T")[0];
          return (
            <li key={comment.comment_id}>
              <CommentCard comment={comment} date={date} />
            </li>
          );
        })}
      </ul>
    </article>
  );
}
