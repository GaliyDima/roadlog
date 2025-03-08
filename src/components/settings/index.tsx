import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import InputField from "../InputField";
import { useDropzone } from "react-dropzone";
import { colors } from "../../constants/colors";
import upload from "../../assets/icons/cloud_upload.svg";
import share from "../../assets/icons/share.svg";
import { ProjectContext } from "../../contexts/ProjectContext";
import { AuthContext } from "../../contexts/AuthContext";
import { getProjectsByEmail } from "../../api/project";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    marginBottom: "24px",
  },
  contentBox: {
    backgroundColor: "white",
    boxShadow: "0px 4px 30px 0px rgba(0, 53, 123, 0.15)",
    width: "33vw",
    padding: "24px",
    borderRadius: "8px",
  },
  title: {
    fontWeight: 700,
    marginBottom: "16px",
    fontSize: "24px",
    lineHeight: "36px",
    textAlign: "start",
  },
  description: {
    marginBottom: "8px",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "start",
    fontWeight: 600,
  },
  dropzone: {
    width: "100%",
    backgroundColor: "rgba(245, 248, 253, 1)",
    border: "1px dashed rgba(176, 193, 216, 1)",
    borderRadius: "4px",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "24px",
  },
  logoPreview: {
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "120px",
    backgroundColor: "rgba(245, 248, 253, 1)",
    border: "1px solid rgba(176, 193, 216, 1)",
    borderRadius: "4px",
  },
  colorPickerBox: {
    display: "flex",
    marginTop: "8px",
    marginBottom: "24px",
    gap: "16px",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "16px",
  },
  add: {
    width: "132px",
    height: "44px",
  },
  label: {
    color: "rgba(115, 123, 128, 1)",
    fontWeight: "600",
    textAlign: "start",
  },
  domain: {
    color: "rgba(115, 123, 128, 1)",
    fontWeight: "600",
    fontSize: "16px",
  },
}));

const Settings: React.FC = () => {
  const classes = useStyles();

  const [projectName, setProjectName] = useState("");
  const [domain, setDomain] = useState("");
  const [logo, setLogo] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [projectCreated, setProjectCreated] = useState(false);
  const [errors, setErrors] = useState<{
    projectName?: string;
    domain?: string;
  }>({});
  const navigate = useNavigate();

  const { createNewProject } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjectsByEmail(user!.email);
      console.log(projects);
      if (projects.length > 0) {
        navigate("/project/" + projects[0].id);
      }
    };
    fetchProjects();
  }, [navigate, user, projectCreated]);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleDrop = (acceptedFiles: any) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setLogo(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: handleDrop,
  });

  const handleCreateProject = async () => {
    const newErrors: { projectName?: string; domain?: string } = {};
    if (!projectName) {
      newErrors.projectName = "Project name is required";
    }
    if (!domain) {
      newErrors.domain = "Domain is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log(projectName, user!.email, [], selectedColor, logo);
    try {
      await createNewProject(projectName, user!.email, [], selectedColor, logo);
      setProjectCreated(true);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
    if (errors.projectName) {
      setErrors((prevErrors) => ({ ...prevErrors, projectName: undefined }));
    }
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
    if (errors.domain) {
      setErrors((prevErrors) => ({ ...prevErrors, domain: undefined }));
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.contentBox}>
        <Typography className={classes.title}>Create your project</Typography>
        <Box marginBottom={"24px"}>
          <InputField
            label="Project name"
            placeholder="Create name for your project"
            type={"text"}
            value={projectName}
            onChange={handleProjectNameChange}
            error={errors.projectName || ""}
          />
        </Box>

        <Typography className={classes.description}>Upload logo</Typography>
        <Box {...getRootProps()} className={classes.dropzone}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the files here ...</Typography>
          ) : (
            <>
              <img src={upload} alt="upload" />
              <Typography>Drag and drop</Typography>
              <Typography>or drop manually</Typography>
            </>
          )}
        </Box>

        {logo && (
          <img
            src={logo}
            alt="Uploaded logo"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        )}

        <Typography className={classes.description}>
          Customize your roadmap interface
        </Typography>
        <Box className={classes.colorPickerBox}>
          {colors.map((color) => (
            <Box
              key={color}
              onClick={() => handleColorClick(color)}
              sx={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: "white",
                padding: "2px",
                boxSizing: "border-box",
                outline:
                  selectedColor === color ? `1px solid ${color}` : "none",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: color,
                }}
              />
            </Box>
          ))}
        </Box>
        <Typography className={classes.label}>Domain</Typography>
        <Box display={"flex"} mb={2} gap={"16px"}>
          <TextField
            placeholder="Add custom domain"
            type="text"
            value={domain}
            onChange={handleDomainChange}
            fullWidth
            error={!!errors.domain}
            helperText={errors.domain}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography className={classes.domain}>
                    .roadlog.com
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
          <img src={share} alt="share" />
        </Box>

        <Box className={classes.actions}>
          <Button
            variant="contained"
            className={classes.add}
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
