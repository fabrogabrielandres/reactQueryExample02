import { useQuery } from "@tanstack/react-query";
import { GithubApi } from "../api/lavels.serivce";
import { sleep } from "../helpers/sleep";
import { Issues, State } from "../interfaces/GitHub";



interface Props {
    tabState?:State,
    listLabelsSelected:Array<string>
}


const fetchIssues = async (tabState?:State,listLabelsSelected?:Array<string>):Promise<Issues[]> => {
    await sleep(2);
    console.error(tabState,listLabelsSelected);

    const params = new URLSearchParams();
    if(tabState)params.append("state",tabState );
    console.log({params});
    
    
    const {data} = await GithubApi.get<Issues[]>('/issues',{params})
    return (data)
}

export const UseIssueList = ({tabState,listLabelsSelected}:Props) => {
    const QueryIssues = useQuery({queryKey:['Issues',tabState,{listLabelsSelected} ],queryFn:()=>fetchIssues(tabState,listLabelsSelected)})
    return ({QueryIssues})
}

