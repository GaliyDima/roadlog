import { Box } from "@mui/material";

import * as React from "react";
import AddBlock from "./AddBlock";
import TaskList from "./TaskList";

const Backlog: React.FC = () => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      marginTop={"40px"}
    >
      <AddBlock />
      <TaskList />
    </Box>
  );
};

export default Backlog;
