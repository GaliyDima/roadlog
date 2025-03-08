import "./App.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthorizationPage from "./pages/AutherizationPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProjectProvider from "./contexts/ProjectContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReleaseProvider from "./contexts/ReleaseContext";
import TaskProvider from "./contexts/TaskContext";
import SettingsPage from "./pages/SettingsPage";
import useProjectData from "./hooks/useProjectData";
import { getProjectStyles } from "./untils/getProjectStyles";

const App: React.FC = () => {
  const { projectData } = useProjectData();
  const styles = getProjectStyles(projectData?.color || "#ffffff");

  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <ProjectProvider>
          <ReleaseProvider>
            <TaskProvider>
              <AuthProvider>
                <ThemeProvider theme={theme}>
                  <div className="App">
                    <Routes>
                      <Route path="/" element={<AuthorizationPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route
                        path="/project/:projectId"
                        element={<MainPage />}
                      />
                    </Routes>
                  </div>
                </ThemeProvider>
              </AuthProvider>
            </TaskProvider>
          </ReleaseProvider>
        </ProjectProvider>
        <ToastContainer />
      </DndProvider>
    </BrowserRouter>
  );
};

export default App;
