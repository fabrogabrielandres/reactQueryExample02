import { FC } from 'react';
import { Issues, State } from '../../interfaces/GitHub';
import { IssueItem } from './IssueItem';

interface Props {
    issues:Issues[]
    tabState?:State 
    changeStateTab:(changeStateTab?: State )=>void
}


export const IssueList = ({issues,tabState,changeStateTab}:Props) => {
    
    return (
        <div className="card border-white">
            <div className="card-header bg-dark">
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item" onClick={()=>changeStateTab()}>
                        <a className={ !tabState ? `nav-link active` : "nav-link"}>All</a>
                    </li>
                    <li className="nav-item" onClick={()=>changeStateTab(State.Open)}>
                        <a className={  tabState == State.Open ? `nav-link active` : "nav-link"}>Open</a>
                    </li>
                    <li className="nav-item" onClick={()=>changeStateTab(State.Close)}>
                        <a className={ tabState == State.Close ? `nav-link active` : "nav-link"}>Closed</a>
                    </li>
                </ul>
            </div>
            <div className="card-body text-dark">
                {
                    issues.map( issue => (
                        <IssueItem key={issue.id}  issue={issue}/>
                    ))
                
                }                
            </div>
        </div>
    )
}
