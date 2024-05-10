import Article from "./Article";
import CommentSection from "./CommentSection";

export default function ArticlePage({ setError }) {
  return (
    <>
      <Article setError={setError} />
      <CommentSection />
    </>
  );
}
