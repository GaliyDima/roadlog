import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    getDoc
} from 'firebase/firestore';
import { v4 } from 'uuid';
import { db } from '../firebase';

export const createProject = async (name: string, email: string | undefined, releases: any, color: string, logo: any) => {
    const projectId = v4();

    const projectRef = collection(db, 'projects');

    await setDoc(doc(projectRef, projectId), {
        name,
        owner: email,
        releases,
        color,
        logo
    });

};
export const getProjectsByEmail = async (email: string | undefined): Promise<any> => {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('owner', '==', email));

    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return projects;
};

export const deleteProjectAndRelatedData = async (projectId: string) => {
  const releasesQuery = query(collection(db, 'releases'), where('projectId', '==', projectId));
  const releasesSnapshot = await getDocs(releasesQuery);

  for (const releaseDoc of releasesSnapshot.docs) {
      const releaseId = releaseDoc.id;

      const tasksQuery = query(collection(db, 'tasks'), where('releaseId', '==', releaseId));
      const tasksSnapshot = await getDocs(tasksQuery);

      for (const taskDoc of tasksSnapshot.docs) {
          await deleteDoc(doc(db, 'tasks', taskDoc.id));
      }

      await deleteDoc(doc(db, 'releases', releaseId));
  }

  const tasksQuery = query(collection(db, 'tasks'), where('projectId', '==', projectId));
  const tasksSnapshot = await getDocs(tasksQuery);

  for (const taskDoc of tasksSnapshot.docs) {
      await deleteDoc(doc(db, 'tasks', taskDoc.id));
  }

  await deleteDoc(doc(db, 'projects', projectId));
};


export const getProjectById = async (projectId: string): Promise<any> => {
    const projectRef = doc(db, 'projects', projectId);
    const projectSnapshot = await getDoc(projectRef);
  
    if (projectSnapshot.exists()) {
      return {
        id: projectSnapshot.id,
        ...projectSnapshot.data()
      };
    }
  };