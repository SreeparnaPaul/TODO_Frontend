import React from "react";
import { ErrorMessage, useField } from "formik";
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const PasswordField = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [field, meta] = useField(props);

  return (
    <div>
      <FormControl sx={{ m: 1, width: "90%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
        <Input
          id="standard-adornment-password"
          name={field.name}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
          {...field}
          {...props}
          type={showPassword ? "text" : "password"}
        />
      </FormControl>
      <ErrorMessage
        component="div"
        className="error"
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
};

export default PasswordField;