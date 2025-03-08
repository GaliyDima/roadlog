import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  label: {
    color: "rgba(130, 130, 130, 1)",
    textAlign: "start",
    fontWeight: "500",
  },
}));

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  error: string | false;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  error,
  placeholder,
  onChange,
  showPassword,
  togglePasswordVisibility,
}) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.label}>{label}</Typography>
      <TextField
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        fullWidth
        error={!!error}
        helperText={error}
        InputProps={{
          endAdornment: showPassword !== undefined &&
            togglePasswordVisibility && (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
        }}
      />
    </Box>
  );
};

export default InputField;
