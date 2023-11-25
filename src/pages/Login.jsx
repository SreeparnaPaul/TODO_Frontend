import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Fab } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Form, Formik } from "formik";
import { initialValues, validation } from "../utils/validation/LoginValidation";
import axios from "axios";
import TextFieldComponent from "../components/formFields/TextFieldComponent";
import PasswordField from "../components/formFields/PasswordField"; 
import { SweetAlert } from "../components/library/SweetAlert";
import { LoadingButton } from "../components/library/LoadingButton";


const Login = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const isValid = await validation.isValid(values);

      if (isValid) {
        setLoader(true);

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_USER}/login`,
          values,
          { headers }
        );

        console.log("Backend response:", response.data);
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
        localStorage.setItem("userName", JSON.stringify(response.data.data.name));
        setLoader(false);
        SweetAlert("Success", "User logged in successfully", "success");
        navigate("/dashboard");
      } else {
        console.log("Form validation not satisfied, API call not made.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };

  return (
    <div className="wrap">
      <div className="registrationCard">
        <div className="card-body">
          <LoadingButton loader={loader} />
          <Fab color="primary" aria-label="add">
            <LockOpenIcon />
          </Fab>
          <h4 style={{ marginTop: "10px" }}>Login to TODO-APP</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={() => {}}
          >
            {(formik) => (
              <Form>
                <TextFieldComponent
                  label="Email Address*"
                  type="email"
                  name="email"
                />
                <PasswordField
                  label="Password*"
                  type="password"
                  name="password"
                />
                <div style={{ margin: "10px" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      const formValues = formik.values;
                      handleSubmit(formValues);
                    }}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
