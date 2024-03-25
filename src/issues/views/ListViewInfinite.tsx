import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { UseIssueList } from "../../Hooks/UseIssueList";
import { SpinLoader } from "../../shared/components/SpinLoader";
import { State } from "../../interfaces/GitHub";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UseIssueListInfinite } from "../../Hooks/UseIssueListInfinite";

export const ListViewInfinite = () => {
  const [tabState, setTabState] = useState<State | undefined>();

  const [listLabelsSelected, setListLabelsSelected] = useState<Array<string>>([]);
  const { QueryIssues } = UseIssueListInfinite({ tabState, listLabelsSelected});

  const onLabelChanged = (label: string): void => {
    listLabelsSelected.includes(label)
      ? setListLabelsSelected(
          listLabelsSelected.filter((labelInList) => labelInList != label)
        )
      : setListLabelsSelected([...listLabelsSelected, label]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {QueryIssues.isLoading ? (
          <SpinLoader />
        ) : (
          <IssueList
            issues={QueryIssues.data?.pages.flat() || []}
            changeStateTab={(newState) => setTabState(newState)}
            tabState={tabState}
          />
        )}
      <div className="d-flex flex-row justify-content-between mt-4  align-items-center">
          <button type="button" className="btn btn-primary" onClick={()=>QueryIssues.fetchNextPage()} disabled = {!QueryIssues.hasNextPage}>
            more...
          </button>
          <span>{QueryIssues.isFetching ?  "loading" : ""}</span>
      </div>

      </div>


      <div className="col-4">
        <LabelPicker
          onLabelChanged={onLabelChanged}
          listLabelsSelected={listLabelsSelected}
        />
      </div>
    </div>
  );
};


