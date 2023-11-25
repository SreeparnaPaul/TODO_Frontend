import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import TextFieldComponent from "../formFields/TextFieldComponent";
import { Formik, Form } from "formik";
import { SweetAlert } from "../library/SweetAlert";
import { LoadingButton } from "../library/LoadingButton";
import axios from "axios";
import {
  initialValues,
  taskvalidation,
} from "../../utils/validation/AddTaskValidation";
import { modalStyle } from "../../utils/common";

const AddTask = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = React.useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };

  const operation = props?.updateTaskObj ? "Edit" : "Add";
  const handleSubmit = async (values) => {
    if (operation === "Add") {
      addTask(values);
    } else {
      editTask(values);
    }
  };
  const addTask = async (values) => {
    try {
      const dataToSend = {
        ...values,
        status: "pending",
      };
      const isValid = await taskvalidation.isValid(dataToSend);

      if (isValid) {
        setLoader(true);

        const headers = {
          "Content-Type": "application/json",
          Authorization: token,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_TASK}/addTask`,
          dataToSend,
          { headers }
        );
        console.log("Backend response:", response.data);

        setLoader(false);
        SweetAlert("Success", "Task added successfully", "success");
        props.fetchAllTasks();
        handleClose();
      } else {
        console.log("Form validation not satisfied, API call not made.");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };
  if (props?.updateTaskObj) {
    initialValues.title = props?.updateTaskObj?.title;
    initialValues.description = props?.updateTaskObj?.description;
  } else {
    initialValues.title = "";
    initialValues.description = "";
  }
  const editTask = async (values) => {
    try {
      const dataToSend = {
        ...values,
        taskId: props?.updateTaskObj?.taskId,
      };
      const isValid = await taskvalidation.isValid(dataToSend);

      if (isValid) {
        setLoader(true);

        const headers = {
          "Content-Type": "application/json",
          Authorization: token,
        };
        const response = await axios.put(
          `${process.env.REACT_APP_API_TASK}/updateTask`,
          dataToSend,
          { headers }
        );
        console.log("Backend response:", response.data);

        setLoader(false);
        SweetAlert("Success", "Task updated successfully", "success");
        props.fetchAllTasks();
        handleClose();
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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <LoadingButton loader={loader} />
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {operation} Task
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={taskvalidation}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <TextFieldComponent
                      label="Task Name*"
                      type="text"
                      name="title"
                    />
                    <TextFieldComponent
                      label="Description*"
                      type="text"
                      name="description"
                    />
                    <div
                      style={{
                        margin: "10px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button variant="contained" type="submit">
                        {operation} Task
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Typography>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AddTask;
