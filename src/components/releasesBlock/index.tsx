import { Box } from "@mui/material";
import React, { useState } from "react";
import AddRelease from "./AddRelease";
import FeatureReleases from "./FutureReleases";
import PastReleases from "./PastReleases";

const ReleasesBlock: React.FC = () => {
  const [createForm, setCreateForm] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="start"
      padding="0px 40px"
      marginTop={"-77px"}
    >
      <Box minWidth="0" sx={createForm ? { flex: "0.3" } : { flex: "1.1" }}>
        <PastReleases />
      </Box>
      <Box
        margin={"0px 10px"}
        paddingTop={"65px"}
        minWidth="0"
        sx={createForm ? { flex: "1.4" } : { flex: "0.8" }}
      >
        <AddRelease createForm={createForm} setCreateForm={setCreateForm} />
      </Box>
      <Box minWidth="0" sx={createForm ? { flex: "0.3" } : { flex: "1.1" }}>
        <FeatureReleases />
      </Box>
    </Box>
  );
};

export default ReleasesBlock;
