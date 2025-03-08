import React, { createContext, useCallback, useMemo, useState } from "react";
import { createTask, getTasks } from "../api/task";

export interface ITask {
  id?: string;
  name: string;
  projectId: string;
  releaseId?: string;
  description: string;
  status: "backlog" | "release";
  label: string;
}

export interface ITaskContext {
  createNewTask: (
    projectId: string,
    name: string,
    description: string,
    status: "backlog" | "release",
    label: string,
    releaseId?: string
  ) => Promise<void>;
  fetchTasks: (projectId: string, releaseId?: string) => Promise<void>;
  tasks: ITask[];
  loading: boolean;
}

export const TaskContext = createContext<ITaskContext>({
  createNewTask: () => Promise.resolve(),
  fetchTasks: () => Promise.resolve(),
  tasks: [],
  loading: false,
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = useCallback(
    async (projectId: string, releaseId?: string) => {
      setLoading(true);
      const fetchedTasks = await getTasks(projectId, releaseId);
      setTasks(fetchedTasks);
      setLoading(false);
    },
    []
  );

  const createNewTask = useCallback(
    async (
      projectId: string,
      name: string,
      description: string,
      status: "backlog" | "release",
      label: string,
      releaseId?: string
    ) => {
      setLoading(true);
      await createTask({
        projectId,
        name,
        description,
        status,
        label,
        releaseId,
      });
      await fetchTasks(projectId, releaseId);
      setLoading(false);
    },
    [fetchTasks]
  );

  const value: ITaskContext = useMemo<ITaskContext>(
    () => ({
      createNewTask,
      fetchTasks,
      tasks,
      loading,
    }),
    [createNewTask, fetchTasks, tasks, loading]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
