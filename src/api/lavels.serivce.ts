import axios from "axios";

export const GithubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {
        Authorization: "Bearer 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"
    }
})

