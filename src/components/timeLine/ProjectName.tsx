import React from "react";
import { Box, Typography } from "@mui/material";
import TimeCenter from "../../assets/icons/TimeCenter";
import useProjectData from "../../hooks/useProjectData";
import { getProjectStyles } from "../../untils/getProjectStyles";

const ProjectName: React.FC = () => {
  const { projectData } = useProjectData();
  const styles = getProjectStyles(projectData?.color || "#ffffff");

  const logoUrl = projectData?.logo || null;
  console.log(styles, "styles");

  return (
    <Box textAlign="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="16px"
      >
        {logoUrl && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <img
              src={logoUrl}
              alt="Project Logo"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                width: "40px",
                height: "40px",
              }}
            />
          </Box>
        )}
        <Typography fontWeight={600} fontSize={"32px"} lineHeight={"48px"}>
          {projectData?.name}
        </Typography>
      </Box>
      <Typography color={"rgba(130, 130, 130, 1)"}>is here</Typography>
      <Box display="flex" justifyContent="center">
        <Box height="28px" borderLeft="1px dashed rgba(0, 91, 214, 1)" />
      </Box>
      <Box display={"flex"} alignItems={"center"} padding={"0 40px"}>
        <Box
          width={"100%"}
          height={"5px"}
          sx={{
            backgroundColor: styles.timelinePast,
            borderRadius: "4px 0 0 4px",
          }}
        />
        <TimeCenter
          outerColor={styles.timelinePresent || "#ffffff"}
          innerColor={styles.timelinePast || "#ffffff"}
        />
        <Box
          width={"100%"}
          height={"5px"}
          sx={{
            backgroundColor: styles.timelineFuture,
            borderRadius: "0 4px 4px 0",
          }}
        />
      </Box>
    </Box>
  );
};

export default ProjectName;
