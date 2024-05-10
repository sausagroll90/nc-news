import { getDateFromTimestamp } from "../modules/utils";
import VoteButtons from "./VoteButtons";

export default function Article({ article, setArticle, commentCount }) {
  const date = article.created_at
    ? getDateFromTimestamp(article.created_at)
    : "";

  return (
    <article className="article">
      <img src={article.article_img_url} alt="" />
      <div className="topic-date-wrapper">
        <p>{article.topic}</p>
        <p>{date}</p>
      </div>
      <h2>{article.title}</h2>
      <p className="author">{article.author}</p>
      <p className="article-body">{article.body}</p>
      <div className="votes-comments-wrapper">
        <p>Votes: {article.votes}</p>
        <p>Comments: {commentCount}</p>
      </div>
      <VoteButtons article_id={article.article_id} setArticle={setArticle} />
    </article>
  );
}
