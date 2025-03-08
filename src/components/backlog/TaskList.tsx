import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import like from "../../assets/icons/like.svg";
import dislike from "../../assets/icons/dislike.svg";
import React, { useEffect, useContext } from "react";
import useTaskDrag from "../../hooks/useTaskDrag";
import { TaskContext } from "../../contexts/TaskContext";
import useProjectData from "../../hooks/useProjectData";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "16px",
    height: "calc(35vh - 32px)",
    overflowY: "auto",
  },
  card: {
    width: "635px",
    height: "44px",
    backgroundColor: "rgba(255, 255, 255, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
  },
}));

const TaskList: React.FC = () => {
  const classes = useStyles();
  const { tasks, loading, fetchTasks } = useContext(TaskContext);
  const { projectId } = useProjectData();

  useEffect(() => {
    fetchTasks(projectId);
  }, [fetchTasks, projectId]);

  const filteredTasks = tasks.filter((task) => task.releaseId === "'");

  const handleDrop = () => {
    fetchTasks(projectId);
  };

  const TaskCard = ({ task }: any) => {
    const { isDragging, drag } = useTaskDrag(task, handleDrop);

    return (
      <Box
        ref={drag}
        className={classes.card}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <Box>
          <Typography fontWeight={600} textAlign={"start"}>
            {task.name}
          </Typography>
          <Typography textAlign={"start"}>{task.description}</Typography>
        </Box>
        <Box>
          <img src={like} alt={"like"} />
          <img src={dislike} alt={"dislike"} />
        </Box>
      </Box>
    );
  };

  if (loading) {
    return <Typography>Loading tasks...</Typography>;
  }

  return (
    <Box className={classes.root}>
      {filteredTasks.length > 0 &&
        filteredTasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
    </Box>
  );
};

export default TaskList;
