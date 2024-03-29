import axios from "axios";

export const GithubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {
        Authorization: "Bearer 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"
    }
})

