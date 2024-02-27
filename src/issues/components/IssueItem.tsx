import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issues, State } from '../../interfaces/GitHub';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../../Hooks/UseIssue';


interface Props{
    issue:Issues
}

export const IssueItem:FC<Props> = ({issue}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const prefetchData = (issueNumber:number)=>{
        queryClient.prefetchQuery({queryKey:['issue',issueNumber],queryFn:()=>getIssueInfo(issueNumber)})
        queryClient.prefetchQuery({queryKey:['issue',issueNumber,"comments"],queryFn:()=>getIssueComments(issueNumber)})
    };
    const preSetData = (issueNumber:number)=>{
        queryClient.setQueryData(['issue',issueNumber],getIssueInfo(issueNumber))
    };
    
    return (
        <div className="card mb-2 issue" onClick={()=>navigate(`/issues/issue/${issue.number}`)} onMouseEnter={()=>preSetData(issue.number)}>
            <div className="card-body d-flex align-items-center">
            {issue.state  == State.Close ?
                <FiInfo size={30} color="red" /> : <FiCheckCircle size={30} color="green" />
            }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issue.title}</span>
                    <span className="issue-subinfo">{issue.number} opened 2 days ago by <span className='fw-bold'>{issue.user.login}</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issue.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issue.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
