import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Fade,
  Backdrop,
  RadioGroup,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import useProjectData from "../../hooks/useProjectData";
import { TaskContext } from "../../contexts/TaskContext";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    padding: "16px 24px 24px",
    width: "474px",
    height: "393px",
    zIndex: 999,
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  label: {
    cursor: "pointer",
    padding: "2px 16px",
    border: "1px solid rgba(51, 51, 51, 1)",
    fontSize: "14px !important",
    borderRadius: "30px",
    fontWeight: 600,
    lineHeight: "21px !important",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
  selectedLabel: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(0, 91, 214, 1)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0, 91, 214, 1)",
    },
  },
  radioGroup: {
    display: "flex",
    gap: "16px",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { projectId } = useProjectData();
  const { createNewTask } = useContext(TaskContext);

  useEffect(() => {
    if (selectedOption && title && description) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [selectedOption, title, description]);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleClose = async () => {
    if (isSaveDisabled) {
      setTitle("");
      setDescription("");
      setSelectedOption("");
      onClose();
      return;
    }

    try {
      await createNewTask(
        projectId,
        title,
        description,
        "backlog",
        selectedOption,
        "'"
      );
      setTitle("");
      setDescription("");
      setSelectedOption("");
      onClose();
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
    >
      <Fade in={open}>
        <Box className={classes.paper}>
          <Box className={classes.header}>
            <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
          </Box>
          <Typography fontWeight={700} fontSize={"24px"} marginBottom={"16px"}>
            Add
          </Typography>
          <Typography
            color={"rgba(115, 123, 128, 1)"}
            fontWeight={700}
            marginBottom={"4px"}
          >
            Choose what you want to add
          </Typography>
          <RadioGroup
            aria-label="add-item-options"
            name="add-item-options"
            value={selectedOption}
            onChange={(event) => handleOptionChange(event.target.value)}
            className={classes.radioGroup}
            sx={{ flexDirection: "row", marginBottom: "16px" }}
          >
            {["bug", "feature"].map((option) => (
              <Box
                key={option}
                onClick={() => handleOptionChange(option)}
                className={`${classes.label} ${
                  selectedOption === option ? classes.selectedLabel : ""
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Box>
            ))}
          </RadioGroup>
          <Box>
            <Typography
              sx={{
                color: "rgba(115, 123, 128, 1)",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Title
            </Typography>
            <TextField
              sx={{
                width: "100%",
                marginBottom: "16px",
              }}
              name="title"
              margin="normal"
              variant="outlined"
              placeholder="Type a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Typography
              sx={{
                color: "rgba(115, 123, 128, 1)",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              Description
            </Typography>
            <TextField
              sx={{
                width: "100%",
                marginBottom: "40px",
              }}
              name="description"
              margin="normal"
              variant="outlined"
              placeholder="Type a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box className={classes.actions}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ width: "90px", height: "44px" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ width: "147px", height: "44px" }}
              disabled={isSaveDisabled}
            >
              Save changes
            </Button>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddItemModal;
