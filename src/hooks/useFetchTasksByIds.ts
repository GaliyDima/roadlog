import { useState, useEffect } from 'react';
import { getTasksByIds, ITask } from '../api/task';

const useFetchTasksByIds = (taskIds: string[]) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const fetchedTasks = await getTasksByIds(taskIds);
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
            setLoading(false);
        };

        if (taskIds.length > 0) {
            fetchTasks();
        } else {
            setLoading(false);
        }
    }, [taskIds]);

    return { tasks, loading };
};

export default useFetchTasksByIds;
