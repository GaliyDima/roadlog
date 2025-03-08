import { Box, Button, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { makeStyles } from "@mui/styles";
import InputField from "../InputField";
import { validateForm } from "../../untils/validation";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    height: "100vh",
  },
  logo: {
    fontWeight: 600,
    color: "rgba(0, 91, 214, 1)",
    fontSize: "32px",
  },
  contentBox: {
    backgroundColor: "white",
    boxShadow: "0px 4px 30px 0px rgba(0, 53, 123, 0.15)",
    width: "22vw",
    padding: "40px 80px",
    borderRadius: "8px",
  },
  title: {
    fontWeight: 600,
    marginBottom: "8px",
    fontSize: "32px",
    lineHeight: "32px",
    textAlign: "start",
  },
  description: {
    marginBottom: "32px",
    fontSize: "14px",
    textAlign: "start",
    color: "rgba(79, 79, 79, 1)",
    fontWeight: 500,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainButton: {
    width: "100%",
    height: "44px",
    marginBottom: "18px",
  },
  bottomButton: {
    display: "flex",
    alignItems: "center",
  },
}));

const AuthorizationForm: React.FC = () => {
  const { loginWithEmail, registerWithEmail, setLoginError } =
    useContext(AuthContext);
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleAuthAction = async () => {
    setFormSubmitted(true);
    const { emailError, passwordError } = validateForm(email, password);
    setEmailError(emailError);
    setPasswordError(passwordError);

    if (!emailError && !passwordError) {
      try {
        if (isRegistering) {
          await registerWithEmail(email, password);
        } else {
          await loginWithEmail(email, password);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.logo}>Roadlog</Typography>
      <Box className={classes.contentBox}>
        <Typography className={classes.title}>
          {isRegistering ? "Create account" : "Log In"}
        </Typography>
        <Typography className={classes.description}>
          Easy way to share road map among your users and business partners
        </Typography>
        <Box marginBottom={"16px"}>
          <InputField
            label="Business Email"
            placeholder="Type your business email"
            type="email"
            value={email}
            error={formSubmitted && emailError}
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginError(null);
            }}
          />
        </Box>

        <Box marginBottom={"48px"}>
          <InputField
            label="Password"
            placeholder="Type your password"
            type={showPassword ? "text" : "password"}
            value={password}
            error={formSubmitted && passwordError}
            onChange={(e) => {
              setPassword(e.target.value);
              setLoginError(null);
            }}
            showPassword={showPassword}
            togglePasswordVisibility={handleClickShowPassword}
          />
        </Box>
        <Box className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            className={classes.mainButton}
            onClick={handleAuthAction}
          >
            {isRegistering ? "Create account" : "Log In"}
          </Button>
          <Box className={classes.bottomButton}>
            <Typography>
              {isRegistering
                ? "Already have an account?"
                : "Don’t have an account?"}
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? <Box> Log In</Box> : <Box> Create account</Box>}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthorizationForm;
