export default function ArticleCard({ article }) {
  const {
    title,
    topic,
    author,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  const date = created_at.split("T")[0];

  return (
    <div className="article-card">
      <h2>{title}</h2>
      <p>{topic}</p>
      <p>{author}</p>
      <p>{date}</p>
      <p>Votes: {votes}</p>
      <p>Comments: {comment_count}</p>
      <img src={article_img_url} alt="" />
    </div>
  );
}
