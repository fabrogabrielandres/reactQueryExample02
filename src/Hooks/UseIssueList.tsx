import { useQuery } from "@tanstack/react-query";
import { GithubApi } from "../api/GithubApi.serivce";
import { sleep } from "../helpers/sleep";
import { Issues, State } from "../interfaces/GitHub";
import { useEffect, useState } from "react";



interface Props {
    listLabelsSelected?:Array<string>
    tabState?:State,
    page?:number
}



const fetchIssues = async ({tabState,listLabelsSelected ,page}:Props):Promise<Issues[]> => {
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
    params.append("page",String(page) )
    params.append("per_page","5" )
   
    
    const {data} = await GithubApi.get<Issues[]>('/issues',{params})
    return (data)
}

export const UseIssueList = ({tabState,listLabelsSelected }:Props) => {

    useEffect(() => {
        setPage(1)    
    }, [tabState,listLabelsSelected])
    
  

    const [page, setPage] = useState<number>(1)

    const QueryIssues = useQuery({queryKey:['Issues',{tabState,listLabelsSelected,page} ],queryFn:()=>fetchIssues({tabState,listLabelsSelected,page}),})
    const nextPage = ()=> {
        if(QueryIssues.data?.length == 0) return;
        setPage(page+1)
    }
    const prevPage = ()=> {
        if(page == 1) return;
        setPage(page-1)
    }

    return ({
        QueryIssues,
        page,        

        //methods
        nextPage,
        prevPage
    })
}

