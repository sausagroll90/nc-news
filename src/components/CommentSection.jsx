import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId } from "../modules/api-requests";
import { getDateFromTimestamp } from "../modules/utils";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  async function fetchComments() {
    const { comments } = await getCommentsByArticleId(article_id);
    setComments(comments);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <article className="comment-section">
      <h2>Comments</h2>
      <AddComment setComments={setComments} />
      <ul>
        {comments.map((comment) => {
          const date = getDateFromTimestamp(comment.created_at);
          return (
            <li key={comment.comment_id}>
              <CommentCard
                comment={comment}
                date={date}
                fetchComments={fetchComments}
              />
            </li>
          );
        })}
      </ul>
    </article>
  );
}
