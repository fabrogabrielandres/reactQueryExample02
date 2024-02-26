import { FC } from "react";
import { UseGitHubApi } from "../../Hooks/UseGitHubApi";
import { SpinLoader } from "../../shared/components/SpinLoader";


interface Prop{
  onLabelChanged:(label:string)=>void,
  listLabelsSelected:Array<string>
}
export const LabelPicker:FC<Prop> = ({listLabelsSelected,onLabelChanged}) => {
  
  const labelsQuery = UseGitHubApi();
  
  if (labelsQuery.isLoading) return <SpinLoader/>

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${listLabelsSelected.includes(label.name)? "label-active" : "" }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}}`,
          }}
          onClick={()=>onLabelChanged(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
