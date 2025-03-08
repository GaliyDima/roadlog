import {
  createProject,
  getProjectsByEmail,
  deleteProjectAndRelatedData,
} from "../api/project";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

export interface IProject {
  imageUrl: any;
  id: string;
  name: string;
  email: string;
  releases: any[];
}

export interface IProjectContext {
  createNewProject: (
    name: string,
    email: string,
    releases: any,
    color: string,
    logo: any
  ) => Promise<void>;
  fetchProjects: (email: string) => Promise<void>;
  deleteExistingProject: (projectId: string, email: string) => Promise<void>;
  projects: IProject[];
  loading: boolean;
}

export const ProjectContext = React.createContext<IProjectContext>({
  createNewProject: () => Promise.resolve(),
  fetchProjects: () => Promise.resolve(),
  deleteExistingProject: () => Promise.resolve(),
  projects: [],
  loading: false,
});

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProjects = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const fetchedProjects = await getProjectsByEmail(email);
      setProjects(fetchedProjects);
      toast.success("Projects fetched successfully!");
    } catch (error) {
      toast.error(
        `Failed to fetch projects: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewProject = useCallback(
    async (
      name: string,
      email: string,
      releases: any,
      color: string,
      logo: any
    ) => {
      setLoading(true);
      try {
        await createProject(name, email, releases, color, logo);
        await fetchProjects(email);
        toast.success("Project created successfully!");
      } catch (error) {
        toast.error(
          `Failed to create project: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchProjects]
  );

  const deleteExistingProject = useCallback(
    async (projectId: string, email: string) => {
      setLoading(true);
      try {
        await deleteProjectAndRelatedData(projectId);
        await fetchProjects(email);
        toast.success("Project deleted successfully!");
      } catch (error) {
        toast.error(
          `Failed to delete project: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchProjects]
  );

  const value: IProjectContext = useMemo<IProjectContext>(
    () => ({
      createNewProject,
      fetchProjects,
      deleteExistingProject,
      projects,
      loading,
    }),
    [createNewProject, fetchProjects, deleteExistingProject, projects, loading]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
