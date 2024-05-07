import axios from "axios";

export function getArticles() {
    return axios
        .get("https://nc-news-yjss.onrender.com/api/articles")
        .then((response) => response.data);
}

export function getArticleById(id) {
    // TODO refactor to use async await
    return axios
        .get("https://nc-news-yjss.onrender.com/api/articles/" + id)
        .then((response) => response.data);
}
