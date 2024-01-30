import { UseGitHubApi } from "../../Hooks/UseGitHubApi";
import { SpinLoader } from "../../shared/components/SpinLoader";

export const LabelPicker = () => {
  const labelsQuery = UseGitHubApi();
  console.log(labelsQuery.data);

  if (labelsQuery.isLoading) return <SpinLoader/>

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          className="badge rounded-pill m-1 label-picker"
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
