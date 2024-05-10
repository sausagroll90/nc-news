import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId } from "../modules/api-requests";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
import LoadingSpinner from "./LoadingSpinner";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  async function fetchComments() {
    const { comments } = await getCommentsByArticleId(article_id);
    setIsLoading(false);
    setComments(comments);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <article className="comment-section">
      <h2>Comments</h2>
      <AddComment setComments={setComments} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard comment={comment} fetchComments={fetchComments} />
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
