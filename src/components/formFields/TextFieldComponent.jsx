import React from "react";
import { ErrorMessage, useField } from "formik";
import { TextField } from "@mui/material";
const TextFieldComponent = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <TextField
        sx={{ m: 1, width: "90%" }}
        id="standard-basic"
        label={label}
        variant="standard"
        {...field}
        {...props}
      />
      <ErrorMessage
        component="div"
        className="error"
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
};

export default TextFieldComponent;