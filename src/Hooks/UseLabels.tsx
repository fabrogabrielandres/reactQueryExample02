import { GithubApi } from '../api/GithubApi.serivce'
import { sleep } from '../helpers/sleep';
import { LabelInterface } from '../interfaces/GitHub'
import { useQuery } from '@tanstack/react-query'

  
const fetchLabels = async ():Promise<Array<LabelInterface>> => {
       
    await sleep(2);
    const { data } = await GithubApi.get<Array<LabelInterface>>(`/labels?per_page=100`,{
        headers:{
            Authorization:null
        }
    })
    return data
}
  

export const UseLabels = () => {
    const QueryLabels = useQuery({queryKey:['Labels'],queryFn:()=>fetchLabels()
    

})
   return QueryLabels
}
