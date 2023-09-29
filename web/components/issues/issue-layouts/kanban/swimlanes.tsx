import React from "react";
// components
import { KanBanGroupByHeaderRoot } from "./headers/group-by-root";
import { KanBanSubGroupByHeaderRoot } from "./headers/sub-group-by-root";
import { KanBan } from "./default";
// constants
import { ISSUE_STATE_GROUPS, ISSUE_PRIORITIES, getValueFromObject } from "constants/issue";
// mobx
import { observer } from "mobx-react-lite";
// mobx
import { useMobxStore } from "lib/mobx/store-provider";
import { RootStore } from "store/root";

interface ISubGroupSwimlaneHeader {
  issues: any;
  sub_group_by: string | null;
  group_by: string | null;
  list: any;
  listKey: string;
}
const SubGroupSwimlaneHeader: React.FC<ISubGroupSwimlaneHeader> = ({
  issues,
  sub_group_by,
  group_by,
  list,
  listKey,
}) => {
  const calculateIssueCount = (column_id: string) => {
    let issueCount = 0;
    issues &&
      Object.keys(issues)?.forEach((_issueKey: any) => {
        issueCount += issues?.[_issueKey]?.[column_id]?.length || 0;
      });
    return issueCount;
  };

  return (
    <div className="relative w-full min-h-full h-max flex items-center">
      {list &&
        list.length > 0 &&
        list.map((_list: any) => (
          <div className="flex-shrink-0 flex flex-col w-[340px]">
            <KanBanGroupByHeaderRoot
              column_id={getValueFromObject(_list, listKey) as string}
              sub_group_by={sub_group_by}
              group_by={group_by}
              issues_count={calculateIssueCount(getValueFromObject(_list, listKey) as string)}
            />
          </div>
        ))}
    </div>
  );
};

interface ISubGroupSwimlane extends ISubGroupSwimlaneHeader {
  issues: any;
}
const SubGroupSwimlane: React.FC<ISubGroupSwimlane> = observer(({ issues, sub_group_by, group_by, list, listKey }) => {
  const { issueKanBanView: issueKanBanViewStore }: RootStore = useMobxStore();

  const calculateIssueCount = (column_id: string) => {
    let issueCount = 0;
    issues?.[column_id] &&
      Object.keys(issues?.[column_id])?.forEach((_list: any) => {
        issueCount += issues?.[column_id]?.[_list]?.length || 0;
      });
    return issueCount;
  };

  return (
    <div className="relative w-full min-h-full h-max">
      {list &&
        list.length > 0 &&
        list.map((_list: any) => (
          <div className="flex-shrink-0 flex flex-col">
            <div className="sticky top-[50px] w-full z-[1] bg-custom-background-90 flex items-center py-1">
              <div className="flex-shrink-0 sticky left-0 bg-custom-background-90 pr-2">
                <KanBanSubGroupByHeaderRoot
                  column_id={getValueFromObject(_list, listKey) as string}
                  sub_group_by={sub_group_by}
                  group_by={group_by}
                  issues_count={calculateIssueCount(getValueFromObject(_list, listKey) as string)}
                />
              </div>
              <div className="w-full border-b border-custom-border-400 border-dashed" />
            </div>
            {!issueKanBanViewStore.kanBanToggle?.subgroupByIssuesVisibility.includes(
              getValueFromObject(_list, listKey) as string
            ) && (
              <div className="relative">
                <KanBan
                  issues={issues?.[getValueFromObject(_list, listKey) as string]}
                  sub_group_by={sub_group_by}
                  group_by={group_by}
                  sub_group_id={getValueFromObject(_list, listKey) as string}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
});

export interface IKanBanSwimLanes {
  issues: any;
  sub_group_by: string | null;
  group_by: string | null;
  handleIssues?: () => void;
}

export const KanBanSwimLanes: React.FC<IKanBanSwimLanes> = observer(({ issues, sub_group_by, group_by }) => {
  const { project: projectStore }: RootStore = useMobxStore();

  return (
    <div className="relative">
      <div className="sticky top-0 z-[2] bg-custom-background-90 h-[50px]">
        {group_by && group_by === "state" && (
          <SubGroupSwimlaneHeader
            issues={issues}
            sub_group_by={sub_group_by}
            group_by={group_by}
            list={projectStore?.projectStates}
            listKey={`id`}
          />
        )}

        {group_by && group_by === "state_detail.group" && (
          <SubGroupSwimlaneHeader
            issues={issues}
            sub_group_by={sub_group_by}
            group_by={group_by}
            list={ISSUE_STATE_GROUPS}
            listKey={`key`}
          />
        )}

        {group_by && group_by === "priority" && (
          <SubGroupSwimlaneHeader
            issues={issues}
            sub_group_by={sub_group_by}
            group_by={group_by}
            list={ISSUE_PRIORITIES}
            listKey={`key`}
          />
        )}

        {group_by && group_by === "labels" && (
          <SubGroupSwimlaneHeader
            issues={issues}
            sub_group_by={sub_group_by}
            group_by={group_by}
            list={projectStore?.projectLabels}
            listKey={`id`}
          />
        )}

        {group_by && group_by === "assignees" && (
          <SubGroupSwimlaneHeader
            issues={issues}
            sub_group_by={sub_group_by}
            group_by={group_by}
            list={projectStore?.projectMembers}
            listKey={`member.id`}
          />
        )}

        {group_by && group_by === "created_by" && (
          <SubGroupSwimlaneHeader
            issues={issues}
            sub_group_by={sub_group_by}
            group_by={group_by}
            list={projectStore?.projectMembers}
            listKey={`member.id`}
          />
        )}
      </div>

      {sub_group_by && sub_group_by === "state" && (
        <SubGroupSwimlane
          issues={issues}
          sub_group_by={sub_group_by}
          group_by={group_by}
          list={projectStore?.projectStates}
          listKey={`id`}
        />
      )}

      {sub_group_by && sub_group_by === "state_detail.group" && (
        <SubGroupSwimlane
          issues={issues}
          sub_group_by={sub_group_by}
          group_by={group_by}
          list={ISSUE_STATE_GROUPS}
          listKey={`key`}
        />
      )}

      {sub_group_by && sub_group_by === "priority" && (
        <SubGroupSwimlane
          issues={issues}
          sub_group_by={sub_group_by}
          group_by={group_by}
          list={ISSUE_PRIORITIES}
          listKey={`key`}
        />
      )}

      {sub_group_by && sub_group_by === "labels" && (
        <SubGroupSwimlane
          issues={issues}
          sub_group_by={sub_group_by}
          group_by={group_by}
          list={projectStore?.projectLabels}
          listKey={`id`}
        />
      )}

      {sub_group_by && sub_group_by === "assignees" && (
        <SubGroupSwimlane
          issues={issues}
          sub_group_by={sub_group_by}
          group_by={group_by}
          list={projectStore?.projectMembers}
          listKey={`member.id`}
        />
      )}

      {sub_group_by && sub_group_by === "created_by" && (
        <SubGroupSwimlane
          issues={issues}
          sub_group_by={sub_group_by}
          group_by={group_by}
          list={projectStore?.projectMembers}
          listKey={`member.id`}
        />
      )}
    </div>
  );
});