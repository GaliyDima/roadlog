import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";

export interface ITask {
  id?: string;
  name: string;
  projectId: string;
  releaseId?: string;
  description: string;
  status: "backlog" | "release";
  label: string;
}

export const createTask = async (task: Omit<ITask, "id">): Promise<void> => {
  const taskId = uuidv4();
  await setDoc(doc(db, "tasks", taskId), { ...task, id: taskId });
};

export const getTasks = async (
  projectId: string,
  releaseId?: string
): Promise<ITask[]> => {
  const tasksRef = collection(db, "tasks");
  let q = query(tasksRef, where("projectId", "==", projectId));
  if (releaseId) {
    q = query(q, where("releaseId", "==", releaseId));
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ITask)
  );
};

export const getTasksByIds = async (taskIds: string[]): Promise<ITask[]> => {
  const tasksRef = collection(db, "tasks");

  const docRefs = taskIds.map((id) => doc(tasksRef, id));

  const docSnapshots = await Promise.all(docRefs.map((ref) => getDoc(ref)));

  const tasks = docSnapshots
    .map((snapshot) => {
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as ITask;
      } else {
        return null;
      }
    })
    .filter((task) => task !== null) as ITask[];

  return tasks;
};
