import { useQuery } from "@tanstack/react-query";
import { GithubApi } from "../api/lavels.serivce";
import { sleep } from "../helpers/sleep";
import { Issues } from "../interfaces/GitHub";

const fetchIssues = async ():Promise<Issues[]> => {
    await sleep(2);
    const {data} = await GithubApi.get<Issues[]>('/issues')
    return (data)
}

export const UseIssueList = () => {
    const QueryIssues = useQuery({queryKey:['Issues'],queryFn:()=>fetchIssues()})
    return ({QueryIssues})
}

