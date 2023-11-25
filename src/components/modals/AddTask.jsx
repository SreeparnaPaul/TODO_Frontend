import React from 'react'
import { Modal, Box, Typography, Button } from "@mui/material";
import TextFieldComponent from '../formFields/TextFieldComponent';
import { Formik, Form } from "formik";
import { SweetAlert } from '../library/SweetAlert';
import { LoadingButton } from '../library/LoadingButton';
import axios from 'axios';
import { initialValues,taskvalidation } from '../../utils/validation/AddTaskValidation';
import { modalStyle } from '../../utils/common';

const AddTask = (props) => {
    const [open, setOpen] = React.useState(props.openModal);
    const [loader, setLoader] = React.useState(false);
    const token = JSON.parse(localStorage.getItem("token"));

    const handleClose = () => {
        props.onClick();
        setOpen(false);
      };
      const handleSubmit = async (values) => {  
        try {
          const dataToSend = {
            ...values,
            status:"pending",
          };
          const isValid = await taskvalidation.isValid(dataToSend);
    
          if (isValid) {
            setLoader(true);
    
            const headers = {
              "Content-Type": "application/json",
              "Authorization":token
            };
    
            const response = await axios.post(
              `${process.env.REACT_APP_API_TASK}/addTask`,
              dataToSend,
              { headers }
            );
            console.log("Backend response:", response.data);
    
            setLoader(false);
            SweetAlert(
              "Success",
              "Task added successfully",
              "success"
            );
    
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
             Add Task
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={taskvalidation}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form>
                    <TextFieldComponent
                      label="Task Name*"
                      type="text"
                      name="title"
                    />

                    <div
                      style={{
                        margin: "10px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button variant="contained"
                        type="submit"
                        onClick={() => {
                          const formValues = formik.values;
                          handleSubmit(formValues);
                        }}
                      >
                        Add Task
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
  )
}

export default AddTask
