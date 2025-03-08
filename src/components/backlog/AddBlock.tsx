import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import AddItemModal from "./AddItemModal";
import useProjectData from "../../hooks/useProjectData";
import { getProjectStyles } from "../../untils/getProjectStyles";

const useStyles = makeStyles(() => ({
  root: {
    width: "289px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontWeight: "600 !important",
    fontSize: "22px !important",
  },
  description: {
    width: "250px",
    marginBottom: "16px !important",
  },
  addButton: {
    gap: "10px",
    height: "44px",
    width: "100px",
  },
}));

const AddBlock: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { projectData } = useProjectData();
  const styles = getProjectStyles(projectData?.color || "#ffffff");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} lineHeight={"33px"}>
        Ideas backlog
      </Typography>
      <Typography className={classes.description}>
        Start creating your Roadmap by adding your ideas, features or bugs
      </Typography>
      <Button
        variant="contained"
        className={classes.addButton}
        onClick={handleOpen}
        style={{ backgroundColor: styles.timelinePast }}
      >
        <AddIcon />
        <Typography fontWeight={"600"}>Add</Typography>
      </Button>
      <AddItemModal open={open} onClose={handleClose} />
    </Box>
  );
};

export default AddBlock;
