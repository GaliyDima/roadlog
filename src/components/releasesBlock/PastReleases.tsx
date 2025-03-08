import { Box, Typography } from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import TaskCard from "./TaskCard";
import { makeStyles } from "@mui/styles";
import { useReleaseDrop } from "../../hooks/useReleaseDrop";
import { useContext } from "react";
import { ReleaseContext } from "../../contexts/ReleaseContext";
import Point from "../../assets/icons/Point";
import useProjectData from "../../hooks/useProjectData";
import { getProjectStyles } from "../../untils/getProjectStyles";
import useTasksByRelease from "../../hooks/useTasksByRelease";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row-reverse",
    gap: "16px",
    width: "100%",
    overflow: "auto",
    paddingBottom: "16px",
  },
  releaseBlock: {
    borderRadius: "8px",
    padding: "8px",
    minWidth: "24vw",
  },
  taskBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxHeight: "176px",
    overflow: "auto",
    padding: "8px",
    borderRadius: "8px",
    overflowX: "hidden",
  },
}));

const ReleaseBlock: React.FC<{ release: any }> = ({ release }) => {
  const classes = useStyles();
  const { projectData } = useProjectData();
  const {
    tasks: tasksByRelease,
    loading,
    fetchTasks,
  } = useTasksByRelease(release.id);
  const styles = getProjectStyles(projectData?.color || "#ffffff");

  const handleDrop = () => {
    fetchTasks();
  };

  const [{ isOver }, drop] = useReleaseDrop(release, handleDrop);

  return (
    <Box className={classes.releaseBlock}>
      <Typography textAlign={"center"} fontWeight={600} marginBottom={"1px"}>
        {dayjs(release.date).format("D MMMM YYYY")}
      </Typography>
      <Point color={styles.timelinePast || "#ffffff"} />
      <Box display="flex" justifyContent="center">
        <Box height="8px" borderLeft={`1px dashed ${styles.timelinePast}`} />
      </Box>
      <Box
        className={classes.taskBlock}
        ref={drop}
        style={{
          backgroundColor: isOver
            ? "rgba(200, 200, 200, 1)"
            : "rgba(245, 245, 245, 1)",
        }}
      >
        {loading ? (
          <Typography>Loading tasks...</Typography>
        ) : tasksByRelease.length > 0 ? (
          tasksByRelease.map((task: any) => (
            <TaskCard task={task} key={task.id} withDrag={true} />
          ))
        ) : (
          <Box>
            <Typography
              sx={{ color: "rgba(130, 130, 130, 1)" }}
              marginBottom={"8px"}
              textAlign={"start"}
            >
              Drag&drop items from ideas backlog
            </Typography>
            <Box
              width={"100%"}
              sx={{ backgroundColor: "rgba(227, 227, 227, 1)" }}
              height={"76px"}
              borderRadius={"8px"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

const PastReleases: React.FC = () => {
  const classes = useStyles();
  const { releases, loading } = useContext(ReleaseContext);

  const today = dayjs();

  const pastReleases = React.useMemo(() => {
    return releases
      .filter((release) => dayjs(release.date).isBefore(today))
      .sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
  }, [releases, today]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={classes.root}>
      {pastReleases.map((release, index) => (
        <ReleaseBlock key={index} release={release} />
      ))}
    </Box>
  );
};

export default PastReleases;
