import Article from "./Article";
import CommentSection from "./CommentSection";
import ErrorPage from "./ErrorPage";

export default function ArticlePage({ setError }) {
  return (
    <>
      <Article setError={setError} />
      <CommentSection />
    </>
  );
}
