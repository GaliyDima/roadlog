import { useDrop } from "react-dnd";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const useReleaseDrop = (release: any, onDrop: () => void) => {
  return useDrop({
    accept: "TASK",
    drop: async (item: any) => {
      console.log(item, release);

      try {
        const taskRef = doc(db, "tasks", item.id);
        await updateDoc(taskRef, {
          releaseId: release.id,
        });
      } catch (error) {
        console.error("Error adding task to release: ", error);
      }

      try {
        const releaseRef = doc(db, "releases", release.id);

        await updateDoc(releaseRef, {
          tasks: arrayUnion(item),
        });

        console.log("Task added to release successfully");
        onDrop();
      } catch (error) {
        console.error("Error adding task to release: ", error);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
};
