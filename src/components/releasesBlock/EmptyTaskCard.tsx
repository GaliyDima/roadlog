import { Box } from "@mui/material";
import React from "react";
import { useDrag } from "react-dnd";

interface TaskCardProps {
  task: any;
  withDrag: boolean;
}

const EmptyTaskCard: React.FC<TaskCardProps> = ({ task, withDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      borderRadius={"8px"}
      border={"1px solid rgba(224, 224, 224, 1)"}
      sx={{ backgroundColor: "white" }}
      padding={"16px"}
      ref={withDrag ? drag : null}
      style={withDrag ? { opacity: isDragging ? 0.5 : 1 } : {}}
    ></Box>
  );
};

export default EmptyTaskCard;
