import { useState, useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ITask } from "../api/task";

const useTasksByRelease = (releaseId: string) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTasks = useCallback(async () => {
    if (!releaseId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const releaseRef = doc(db, "releases", releaseId);
      const releaseDoc = await getDoc(releaseRef);

      if (releaseDoc.exists()) {
        const releaseData = releaseDoc.data();
        setTasks(releaseData.tasks || []);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks by release:", error);
      setTasks([]);
    }
    setLoading(false);
  }, [releaseId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, fetchTasks };
};

export default useTasksByRelease;
