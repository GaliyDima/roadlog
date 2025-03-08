import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Typography } from "@mui/material";
import AutherizationForm from "../components/autherization";
import { useNavigate } from "react-router-dom";

const AuthorizationPage: React.FC = () => {
  const { authLoaded, user } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/settings");
    }
  }, [navigate, user]);

  if (!authLoaded) {
    return <Typography>Loading ...</Typography>;
  }

  return <AutherizationForm />;
};

export default AuthorizationPage;
