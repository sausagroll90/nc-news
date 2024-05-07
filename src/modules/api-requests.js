import axios from "axios";

export async function getArticles() {
    const response = await axios.get(
        "https://nc-news-yjss.onrender.com/api/articles"
    );
    return response.data;
}

export async function getArticleById(id) {
    const response = await axios.get(
        "https://nc-news-yjss.onrender.com/api/articles/" + id
    );
    return response.data;
}
