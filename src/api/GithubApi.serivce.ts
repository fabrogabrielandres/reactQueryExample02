import axios from "axios";

export const GithubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {
        Authorization: "Bearer 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"
    }
})

