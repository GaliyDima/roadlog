import { useDrag } from "react-dnd";

const useTaskDrag = (task: any, onDrop: () => void) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: task,
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDrop();
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return { isDragging, drag };
};

export default useTaskDrag;
