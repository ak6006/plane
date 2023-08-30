"use client";

// mobx react lite
import { observer } from "mobx-react-lite";
// interfaces
import { IIssueState } from "types/issue";
// constants
import { issueGroupFilter } from "constants/data";
// mobx hook
import { useMobxStore } from "lib/mobx/store-provider";
import { RootStore } from "store/root";

export const IssueListHeader = observer(({ state }: { state: IIssueState }) => {
  const store: RootStore = useMobxStore();

  const stateGroup = issueGroupFilter(state.group);

  if (stateGroup === null) return <></>;

  return (
    <div className="pb-3 flex items-center">
      <div className="w-[28px] h-[28px] flex justify-center items-center">
        <stateGroup.icon />
      </div>
      <div className="font-semibold text-base capitalize ml-2 mr-3">{state?.name}</div>
      <div className="text-gray-700 w-full max-w-[26px] h-[20px] flex justify-center items-center rounded-full">
        {/* {store.issue.getCountOfIssuesByState(state.id)} */}
      </div>
    </div>
  );
});
