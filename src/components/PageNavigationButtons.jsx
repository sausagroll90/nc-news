import { useSearchParams } from "react-router-dom";

export default function PageNavigationButtons({ perPageLimit, totalCount }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function nextPage() {
    const currentPage = searchParams.get("p") || "1";
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("p", Number(currentPage) + 1);
    setSearchParams(newSearchParams);
  }

  function previousPage() {
    const currentPage = searchParams.get("p");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("p", Number(currentPage) - 1);
    setSearchParams(newSearchParams);
  }

  return (
    <div className="page-navigation-buttons">
      <button
        className="button"
        disabled={!searchParams.get("p") || searchParams.get("p") === "1"}
        onClick={previousPage}
      >
        Prev page
      </button>
      <button
        className="button"
        disabled={Number(searchParams.get("p")) * perPageLimit > totalCount}
        onClick={nextPage}
      >
        Next page
      </button>
    </div>
  );
}
