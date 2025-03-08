import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeStyles } from "@mui/styles";
import { useDrop } from "react-dnd";
import dayjs from "dayjs";
import { ReleaseContext } from "../../contexts/ReleaseContext";
import useProjectData from "../../hooks/useProjectData";

const useStyles = makeStyles(() => ({
  root: {
    width: "48vw",
    height: "42vh",
    padding: "8px",
    backgroundColor: "rgba(245, 245, 245, 1)",
    borderRadius: "8px",
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.1)",
    display: "flex",
    gap: "24px",
    justifyContent: "space-between",
    alignItems: "start",
  },
  notes: {
    width: "calc(100% - 40px)",
    height: "calc(100% - 78px)",
    resize: "none",
    padding: "16px",
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "8px",
  },
}));

interface AddReleaseFormProps {
  onClose: () => void;
}

const AddReleaseForm: React.FC<AddReleaseFormProps> = ({ onClose }) => {
  const classes = useStyles();
  const [releaseDate, setReleaseDate] = useState<any>(null);
  const [releaseNotes, setReleaseNotes] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const { projectId } = useProjectData();
  const { createNewRelease } = useContext(ReleaseContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: any) => {
      setTasks((prevTasks) => [...prevTasks, item.id]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleSaveRelease = async () => {
    const formattedDate = dayjs(releaseDate).format("YYYY-MM-DD");
    await createNewRelease(projectId, formattedDate, releaseNotes, tasks);
    onClose();
  };

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box className={classes.root}>
        <Box width={"100%"}>
          <Typography
            fontSize={"18px"}
            lineHeight={"27px"}
            fontWeight={600}
            textAlign={"start"}
          >
            New Release
          </Typography>
          <Typography
            color={"rgba(130, 130, 130, 1)"}
            marginBottom={"8px"}
            textAlign={"start"}
          >
            Drag&drop items from ideas backlog
          </Typography>
          <Box
            width={"100%"}
            height={"90px"}
            marginBottom={"24px"}
            borderRadius={"8px"}
            sx={{ backgroundColor: "rgba(227, 227, 227, 1)" }}
            ref={drop}
            style={{
              backgroundColor: isOver
                ? "rgba(200, 200, 200, 1)"
                : "rgba(227, 227, 227, 1)",
            }}
          />
          <Typography
            color={"rgba(130, 130, 130, 1)"}
            marginBottom={"8px"}
            textAlign={"start"}
          >
            Release date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <DatePicker
                value={releaseDate}
                onChange={(date) => setReleaseDate(date)}
                maxDate={dayjs()}
              />
            </DemoItem>
          </LocalizationProvider>
        </Box>
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Box height={"100%"}>
            <Typography color={"rgba(130, 130, 130, 1)"} textAlign={"start"}>
              Release notes
            </Typography>
            <textarea
              value={releaseNotes}
              className={classes.notes}
              onChange={(e) => setReleaseNotes(e.target.value)}
            ></textarea>
          </Box>

          <Box
            width={"100%"}
            display={"flex"}
            gap={"16px"}
            justifyContent={"center"}
          >
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSaveRelease} variant="contained">
              Save Release
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddReleaseForm;
