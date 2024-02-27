import axios from "axios";

export const GithubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {
        Authorization: "Bearer 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"
    }
})

