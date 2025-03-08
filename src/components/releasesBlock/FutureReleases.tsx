import { Box, Typography } from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import TaskCard from "./TaskCard";
import { makeStyles } from "@mui/styles";
import { useReleaseDrop } from "../../hooks/useReleaseDrop";
import useFetchTasksByIds from "../../hooks/useFetchTasksByIds";
import { useContext } from "react";
import { ReleaseContext } from "../../contexts/ReleaseContext";
import useProjectData from "../../hooks/useProjectData";
import PointFuture from "../../assets/icons/PointFuture";
import { getProjectStyles } from "../../untils/getProjectStyles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
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
  const [{ isOver }, drop] = useReleaseDrop(release, () => {});
  const { tasks = [], loading } = useFetchTasksByIds(release.tasks || []);
  const { projectData } = useProjectData();
  const styles = getProjectStyles(projectData?.color || "#ffffff");

  return (
    <Box className={classes.releaseBlock}>
      <Typography textAlign={"center"} fontWeight={600} marginBottom={"1px"}>
        {release.quarter} ({release.year})
      </Typography>
      <PointFuture color={styles.timelinePast || "#ffffff"} />
      <Box display="flex" justifyContent="center">
        <Box height="8px" borderLeft={`1px dashed ${styles.timelinePast}`} />
      </Box>
      <Box
        className={classes.taskBlock}
        ref={drop}
        style={{
          backgroundColor: isOver
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 1)",
        }}
      >
        {loading ? (
          <Typography>Loading tasks...</Typography>
        ) : tasks.length > 0 ? (
          tasks.map((task: any) => (
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

const FeatureReleases: React.FC = () => {
  const classes = useStyles();
  const { fetchReleases, loading } = useContext(ReleaseContext);
  const { projectId } = useProjectData();

  const today = dayjs();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNextFourQuarters = () => {
    const quarters = [];
    for (let i = 0; i < 4; i++) {
      const startMonth = 3 * i;
      const year = today.year() + Math.floor((today.month() + startMonth) / 12);
      const monthInYear = (today.month() + startMonth) % 12;
      const quarter = Math.floor(monthInYear / 3) + 1;
      quarters.push({
        quarter: `Quarter ${quarter}`,
        year,
        tasks: [],
      });
    }
    return quarters;
  };

  const upcomingReleases = React.useMemo(() => {
    return getNextFourQuarters();
  }, [getNextFourQuarters]);

  React.useEffect(() => {
    fetchReleases(projectId);
  }, [fetchReleases, projectId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={classes.root}>
      {upcomingReleases.map((release, index) => (
        <ReleaseBlock key={index} release={release} />
      ))}
    </Box>
  );
};

export default FeatureReleases;
