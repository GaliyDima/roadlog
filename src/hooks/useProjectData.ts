import { useEffect, useState, useCallback, useContext, useMemo } from "react";
import {
  createProject,
  getProjectsByEmail,
  deleteProjectAndRelatedData,
  getProjectById,
} from "../api/project";
import useStorage from "./useStorage";
import { AuthContext } from "../contexts/AuthContext";

export interface IProject {
  id: string;
  name: string;
  email: string;
  releases: any[];
  logo: any;
  color: string;
}

export const useProjectData = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectData, setProjectData] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useStorage(
    "selectedProject",
    null
  );

  const { user } = useContext(AuthContext);
  const email = user?.email;

  const fetchUserProjects = useCallback(async () => {
    if (!email) return;
    setLoading(true);
    const projects = await getProjectsByEmail(email);
    setProjects(projects);
    setLoading(false);
  }, [email]);

  const fetchProjectData = useCallback(
    async (id: string) => {
      if (!email || !id) return;
      setLoading(true);
      const data = await getProjectById(id);
      setProjectData(data);
      setLoading(false);
    },
    [email]
  );

  useEffect(() => {
    fetchUserProjects();
  }, [fetchUserProjects]);

  const projectId = useMemo(() => {
    if (
      projects.length > 0 &&
      !projects.find((p) => p.id === selectedProjectId)
    ) {
      setSelectedProjectId(projects[0]?.id);
      return projects[0]?.id;
    }
    return selectedProjectId || projects[0]?.id;
  }, [projects, selectedProjectId, setSelectedProjectId]);

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, [projectId, fetchProjectData]);

  const createNewProject = useCallback(
    async (name: string, releases: any, color: string, logo: any) => {
      setLoading(true);
      await createProject(name, email, releases, color, logo);
      await fetchUserProjects();
      setLoading(false);
    },
    [email, fetchUserProjects]
  );

  const deleteExistingProject = useCallback(
    async (projectId: string) => {
      setLoading(true);
      await deleteProjectAndRelatedData(projectId);
      await fetchUserProjects();
      setLoading(false);
    },
    [fetchUserProjects]
  );

  const setProjectId = (id: string) => {
    setSelectedProjectId(id);
  };

  return {
    projectId,
    projectData,
    loading,
    projects,
    fetchProjectData,
    setSelectedProjectId,
    fetchUserProjects,
    createNewProject,
    deleteExistingProject,
    setProjectId,
  };
};

export default useProjectData;
