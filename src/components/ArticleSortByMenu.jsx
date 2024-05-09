import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function ArticleSortByMenu() {
  const [chosenSort, setChosenSort] = useState("date-latest");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentSortBy = searchParams.get("sort_by");
    if (currentSortBy === "created_at") {
      if (searchParams.get("order") === "desc") {
        setChosenSort("date-latest");
      } else {
        setChosenSort("date-oldest");
      }
    } else if (currentSortBy === "comment_count") {
      setChosenSort("comments");
    } else if (currentSortBy) {
      setChosenSort(currentSortBy);
    }
  }, []);

  function handleChange(event) {
    setChosenSort(event.target.value);
    const newSearchParams = new URLSearchParams(searchParams);
    switch (event.target.value) {
      case "date-latest":
        newSearchParams.set("sort_by", "created_at");
        newSearchParams.set("order", "desc");
        break;
      case "date-oldest":
        newSearchParams.set("sort_by", "created_at");
        newSearchParams.set("order", "asc");
        break;
      case "comments":
        newSearchParams.set("sort_by", "comment_count");
        newSearchParams.set("order", "desc");
        break;
      case "votes":
        newSearchParams.set("sort_by", "votes");
        newSearchParams.set("order", "desc");
        break;
      case "author":
        newSearchParams.set("sort_by", "author");
        newSearchParams.set("order", "asc");
        break;
      case "title":
        newSearchParams.set("sort_by", "title");
        newSearchParams.set("order", "asc");
        break;
    }
    setSearchParams(newSearchParams);
  }

  return (
    <select
      aria-label="sort results"
      className="filter-menu"
      value={chosenSort}
      onChange={handleChange}
    >
      <option value="date-latest">date (latest)</option>
      <option value="date-oldest">date (oldest)</option>
      <option value="votes">votes</option>
      <option value="comments">comments</option>
      <option value="author">author</option>
      <option value="title">title</option>
    </select>
  );
}
