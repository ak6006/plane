export interface IWorkspace {
  id: string;
  name: string;
  slug: string;
}

export interface IProject {
  id: string;
  identifier: string;
  name: string;
  description: string;
  cover_image: string | null;
  icon_prop: string | null;
  emoji: string | null;
}

export interface IProjectSettings {
  comments: boolean;
  reactions: boolean;
  votes: boolean;
  views: {
    list: boolean;
    gantt: boolean;
    kanban: boolean;
    calendar: boolean;
    spreadsheet: boolean;
  };
}

export interface IProjectStore {
  loader: boolean;
  error: any | null;

  projectsList: IProject[] | null;
  workspace: IWorkspace | null;
  project: IProject | null;
  workspaceProjectSettings: IProjectSettings | null;

  getWorkspaceProjectsListAsync: (workspace_slug: string) => Promise<void>;
  getProjectSettingsAsync: (workspace_slug: string, project_slug: string) => Promise<void>;
}
