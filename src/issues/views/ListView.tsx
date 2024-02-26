import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { UseIssueList } from '../../Hooks/UseIssueList';
import { SpinLoader } from '../../shared/components/SpinLoader';


export const ListView = () => {
 
  const [listLabelsSelected, setListLabelsSelected] = useState<Array<string>>([])
  const {QueryIssues} = UseIssueList();
  
  const onLabelChanged = (label:string):void => {
    listLabelsSelected.includes(label) ? setListLabelsSelected(listLabelsSelected.filter(labelInList=>labelInList!=label)) : setListLabelsSelected([...listLabelsSelected,label]);
  }
  

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {QueryIssues.isLoading ? <SpinLoader/> : <IssueList issues = {QueryIssues.data || []}/>}        
      </div>      
      <div className="col-4">
        <LabelPicker onLabelChanged={onLabelChanged} listLabelsSelected={listLabelsSelected} />
      </div>
    </div>
  )
}

