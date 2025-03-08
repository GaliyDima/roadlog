import { useState, useCallback, useEffect } from 'react';
import { createTask, getTasks, ITask } from '../api/task';
import useProjectData from './useProjectData';

export const useTaskData = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { projectId } = useProjectData();

    const fetchTasks = useCallback(async (releaseId?: string) => {
        setLoading(true);
        const fetchedTasks = await getTasks(projectId, releaseId);
        setTasks(fetchedTasks);
        setLoading(false);
    }, [projectId]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const addTask = useCallback(async (task: ITask) => {
        setLoading(true);
        await createTask(task);
        await fetchTasks();
        
        setLoading(false);
    }, [fetchTasks]);

    return { tasks, loading, error, fetchTasks, addTask };
};
