import * as React from "react";
import Header from "../components/header";
import TimeLine from "../components/timeLine";
import ReleasesBlock from "../components/releasesBlock";
import Backlog from "../components/backlog";
import useProjectData from "../hooks/useProjectData";
import { getProjectStyles } from "../untils/getProjectStyles";
const MainPage: React.FC = () => {
  const { projectData } = useProjectData();
  const styles = getProjectStyles(projectData?.color || "#ffffff");
  return (
    <div style={{ backgroundColor: styles.background }}>
      <Header />
      <TimeLine />
      <ReleasesBlock />
      <Backlog />
    </div>
  );
};

export default MainPage;
