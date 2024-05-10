import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getCommentsByArticleId } from "../modules/api-requests";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
import LoadingSpinner from "./LoadingSpinner";
import PageNavigationButtons from "./PageNavigationButtons";

export default function CommentSection({ commentCount, setCommentCount }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [searchParams] = useSearchParams();

  const COMMENT_LIMIT = 5;

  async function fetchComments() {
    const page = Number(searchParams.get("p")) || 1;
    const { comments: newComments } = await getCommentsByArticleId(
      article_id,
      page,
      COMMENT_LIMIT
    );
    setIsLoading(false);
    setComments(newComments);
  }

  useEffect(() => {
    fetchComments();
  }, [searchParams]);

  return (
    <article className="comment-section">
      <h2>Comments</h2>
      <AddComment
        fetchComments={fetchComments}
        setCommentCount={setCommentCount}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard
                  comment={comment}
                  fetchComments={fetchComments}
                  setCommentCount={setCommentCount}
                />
              </li>
            );
          })}
        </ul>
      )}
      <PageNavigationButtons
        perPageLimit={COMMENT_LIMIT}
        totalCount={commentCount}
      />
    </article>
  );
}
