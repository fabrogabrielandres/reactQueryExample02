import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { GithubApi } from "../api/GithubApi.serivce"
import { Issues } from "../interfaces/GitHub"
import { sleep } from "../helpers/sleep"



export const getIssueInfo = async (issueNumber:number):Promise<Issues>=>{
    await sleep(2)
    const { data } = await GithubApi.get<Issues>(`issues/${issueNumber}`)
    console.log("issues",data);
    return (data)
}

export const getIssueComments = async (issueNumber:number):Promise<Issues[]>=>{
    await sleep(2)
    const { data } = await GithubApi.get<Issues[]>(`issues/${issueNumber}/comments`)
    console.log("comments",data);
    
    return (data)
}

export const UseIssue = (issueNumber:number) => {
    const issueQuery    = useQuery({queryKey:['issue',issueNumber],
        queryFn:()=>getIssueInfo(issueNumber)});
    const commentsQuery = useQuery({queryKey:['issue',issueNumber , "comments"],
        queryFn:()=>getIssueComments(issueNumber),enabled:issueQuery.data !== undefined});
        // enabled, with this condition i chose if i want to do the petition or not 
     return ( {issueQuery,commentsQuery} )
}
