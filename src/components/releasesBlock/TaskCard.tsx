import { Box, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import useTaskDrag from "../../hooks/useTaskDrag";

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "8px",
    backgroundColor: "white",
    padding: "16px",
  },
  label: {
    marginBottom: "9.5px",
    width: "max-content",
    padding: "0 8px",
    borderRadius: "30px",
  },
}));

interface TaskCardProps {
  task: any;
  withDrag: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, withDrag }) => {
  const classes = useStyles();

  const { isDragging, drag } = useTaskDrag(task, () => withDrag);

  return (
    <Box
      className={classes.root}
      ref={withDrag ? drag : null}
      style={withDrag ? { opacity: isDragging ? 0.5 : 1 } : {}}
    >
      <Box
        className={classes.label}
        sx={
          task.label === "bug"
            ? { backgroundColor: "rgba(255, 225, 166, 1)" }
            : { backgroundColor: "rgba(166, 204, 255, 1)" }
        }
      >
        <Typography
          fontSize={"12px"}
          lineHeight={"18px"}
          textTransform={"capitalize"}
          fontWeight={600}
        >
          {task.label}
        </Typography>
      </Box>
      <Typography textAlign={"start"}>{task.name}</Typography>
    </Box>
  );
};

export default TaskCard;
