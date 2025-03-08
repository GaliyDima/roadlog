import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddReleaseForm from "./AddReleaseForm";
import useProjectData from "../../hooks/useProjectData";
import { getProjectStyles } from "../../untils/getProjectStyles";

interface AddReleaseProps {
  createForm: boolean;
  setCreateForm: (value: boolean) => void;
}

const AddRelease: React.FC<AddReleaseProps> = ({
  createForm,
  setCreateForm,
}) => {
  const { projectData } = useProjectData();
  const styles = getProjectStyles(projectData?.color || "#ffffff");
  return (
    <Box>
      {createForm ? (
        <AddReleaseForm
          onClose={() => {
            setCreateForm(false);
          }}
        />
      ) : (
        <>
          <Button
            onClick={() => {
              setCreateForm(true);
            }}
            variant="contained"
            sx={{
              width: "195px",
              height: "44px",
              backgroundColor: styles.timelinePast,
              marginBottom: "8px",
            }}
          >
            Create New Release
          </Button>
          <Typography>Press the button to create New Release</Typography>
        </>
      )}
    </Box>
  );
};

export default AddRelease;
