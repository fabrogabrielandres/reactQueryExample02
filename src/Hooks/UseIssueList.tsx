import { useQuery } from "@tanstack/react-query";
import { GithubApi } from "../api/GithubApi.serivce";
import { sleep } from "../helpers/sleep";
import { Issues, State } from "../interfaces/GitHub";



interface Props {
    listLabelsSelected?:Array<string>
    tabState?:State,
}


const fetchIssues = async (tabState:State | undefined,listLabelsSelected?:Array<string>):Promise<Issues[]> => {
    await sleep(2);
    const params = new URLSearchParams();
    if(tabState){
        params.append("state",tabState )
    }
    if(listLabelsSelected){
        const listLabels = listLabelsSelected.join(",")
        console.log("listLabels",listLabels);
        params.append("labels",listLabels )
    }
    params.append("page","1" )
    params.append("per_page","5" )
    console.log({params});

    
    
    const {data} = await GithubApi.get<Issues[]>('/issues',{params})
    return (data)
}

export const UseIssueList = ({tabState,listLabelsSelected}:Props) => {
    const QueryIssues = useQuery({queryKey:['Issues',tabState,{listLabelsSelected} ],queryFn:()=>fetchIssues(tabState,listLabelsSelected)})
    return ({QueryIssues})
}

