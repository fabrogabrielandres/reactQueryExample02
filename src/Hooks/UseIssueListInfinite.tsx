import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { Issues, State } from '../interfaces/GitHub'
import { sleep } from '../helpers/sleep'
import { GithubApi } from '../api/GithubApi.serivce'



interface Props {
  listLabelsSelected?:Array<string>
  tabState?:State,
  page?:number
}

interface QueryProps {
  pageParam? : number,
  queryKey : Array<string  | Props>
}



const fetchIssues = async ({queryKey, pageParam=1}:QueryProps):Promise<Issues[]> => {
  await sleep(2);
  
  const params = new URLSearchParams();

  const   [,,args] = queryKey;
  const { listLabelsSelected, tabState } = args as Props;
  


  if(tabState){
      params.append("state",tabState )
  }
  if(listLabelsSelected){
      const listLabels = listLabelsSelected.join(",")
      params.append("labels",listLabels )
  }
  console.log("pageParamspageParamspageParamspageParams",pageParam);
  
  params.append("page",String(pageParam))
  params.append("per_page","5" )

  console.log("params",params);
  
 
  
  const {data} = await GithubApi.get<Issues[]>('/issues',{params})
  return (data)
}




export const UseIssueListInfinite = ({tabState,listLabelsSelected}:Props) => {





const QueryIssues = useInfiniteQuery({queryKey:['Issues',"infinite",{tabState,listLabelsSelected} ],queryFn:(data)=>fetchIssues(data),
getNextPageParam:(page,pages)=>{
  // console.log("page",page);
  // console.log("pages",pages);
  
  if(pages.length === 0) return;
  return pages.length +1
},
initialPageParam:1
})

  
  return ({QueryIssues})
}
