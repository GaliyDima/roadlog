import {
    collection,
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';

export interface IRelease {
    id: string;
    projectId: string;
    date: string;
    notes: string;
    tasks: string[];
}

export const createRelease = async (projectId: string, date: string, notes: string, tasks: string[]): Promise<string> => {
    const releaseId = uuidv4();
    await setDoc(doc(db, 'releases', releaseId), {
        projectId,
        date,
        notes,
        tasks,
    });
    return releaseId;
};

export const updateReleaseTasks = async (releaseId: string, task: string, action: 'add' | 'remove'): Promise<void> => {
    const releaseDoc = doc(db, 'releases', releaseId);

    if (action === 'add') {
        await updateDoc(releaseDoc, {
            tasks: arrayUnion(task),
        });
    } else if (action === 'remove') {
        await updateDoc(releaseDoc, {
            tasks: arrayRemove(task),
        });
    } else {
        throw new Error('Invalid action. Use "add" or "remove"');
    }
};

export const getReleasesByProjectId = async (projectId: string): Promise<IRelease[]> => {
    const q = query(collection(db, 'releases'), where('projectId', '==', projectId));
    const querySnapshot = await getDocs(q);
    const releases: IRelease[] = [];
    querySnapshot.forEach((doc) => {
        releases.push({ id: doc.id, ...doc.data() } as IRelease);
    });
    return releases;
};
