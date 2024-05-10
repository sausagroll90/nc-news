import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { APIError } from "../modules/errors";
import { getArticles } from "../modules/api-requests";
import ArticleList from "./ArticleList";
import ArticleSortByMenu from "./ArticleSortByMenu";
import ArticleTopicMenu from "./ArticleTopicMenu";
import PageNavigationButtons from "./PageNavigationButtons";
import LoadingSpinner from "./LoadingSpinner";

export default function Home({ setError }) {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const ARTICLE_LIMIT = 10;

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const { articles, total_count } = await getArticles(
          searchParams,
          ARTICLE_LIMIT
        );
        setIsLoading(false);
        setArticles(articles);
        setTotalCount(total_count);
      } catch (e) {
        if (e instanceof APIError) {
          setError(e);
        } else {
          throw e;
        }
      }
    }
    fetchArticles();
  }, [searchParams]);

  return (
    <>
      <div className="filter-wrapper">
        <ArticleTopicMenu />
        <ArticleSortByMenu />
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ArticleList articles={articles} setError={setError} />
      )}
      <PageNavigationButtons
        perPageLimit={ARTICLE_LIMIT}
        totalCount={totalCount}
      />
    </>
  );
}
