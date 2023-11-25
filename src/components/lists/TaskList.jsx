import React from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Button,
} from "@mui/material";
import { newDateChanger } from "../../utils/common";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { LoadingButton } from "../library/LoadingButton";
import { SweetAlert } from "../library/SweetAlert";
import AddTask from "../modals/AddTask";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [allTasks, setAllTasks] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [openEditTask, setOpenEditTask] = React.useState(false);
  const [updateTaskObj, setUpdateTasObj] = React.useState();
  const [openAddTask, setOpenAddTask] = React.useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  React.useEffect(() => {
    fetchAllTasks();
  }, []);
  const fetchAllTasks = async () => {
    setLoading(true);
    let apiUrl = `${process.env.REACT_APP_API_TASK}/getTasks`;

    const headers = {
      Authorization: token,
    };
    let response = null;
    try {
      response = await axios.get(apiUrl, { headers });

      console.log("Backend response:", response);
      setAllTasks(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/login");
      }
    }
  };
  const completeTask = async (taskId) => {
    setLoading(true);
    const dataToSend = {
      taskId: taskId,
      status: "complete",
    };
    let apiUrl = `${process.env.REACT_APP_API_TASK}/updateTask`;

    const headers = {
      Authorization: token,
    };

    try {
      const response = await axios.put(apiUrl, dataToSend, { headers });

      console.log("Backend response:", response);
      SweetAlert("Success", "Task completed successfully", "success");
      fetchAllTasks();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };
  const deleteTask = async (taskId) => {
    setLoading(true);

    let apiUrl = `${process.env.REACT_APP_API_TASK}/deleteTask?taskId=${taskId}`;

    const headers = {
      Authorization: token,
    };

    try {
      const response = await axios.delete(apiUrl, { headers });

      console.log("Backend response:", response);
      SweetAlert("Success", "Task deleted successfully", "success");
      fetchAllTasks();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <LoadingButton loader={loading} />
        {openEditTask && updateTaskObj && (
          <AddTask
            updateTaskObj={updateTaskObj}
            openModal={true}
            onClick={() => setOpenEditTask(false)}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        {openAddTask && (
          <AddTask
            openModal={true}
            onClick={() => setOpenAddTask(false)}
            fetchAllTasks={fetchAllTasks}
          />
        )}
        <Button onClick={() => setOpenAddTask(true)} variant="contained">
          <b>Add Task</b>
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTasks &&
              allTasks?.map((allTask) => (
                <TableRow
                  key={allTask._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {allTask.title}
                  </TableCell>
                  <TableCell>{allTask.description}</TableCell>
                  <TableCell>
                    {allTask.status === "pending" ? (
                      <Tooltip title="Pending">
                        <QueryBuilderIcon sx={{ color: "red" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Completed">
                        <TaskAltIcon sx={{ color: "green" }} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{newDateChanger(allTask.createdAt)}</TableCell>
                  <TableCell>{newDateChanger(allTask.updatedAt)}</TableCell>
                  <TableCell>
                    {allTask.status === "pending" ? (
                      <>
                        <Tooltip title="Complete Task">
                          <TaskAltIcon
                            onClick={() => completeTask(allTask.taskId)}
                          />
                        </Tooltip>
                        <Tooltip title="Edit Task">
                          <EditIcon
                            onClick={() => {
                              setUpdateTasObj(allTask);
                              setOpenEditTask(true);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Delete Task">
                          <DeleteIcon
                            onClick={() => deleteTask(allTask.taskId)}
                          />
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Complete Task">
                          <TaskAltIcon sx={{ color: "#bab9b9cc" }} />
                        </Tooltip>
                        <Tooltip title="Edit Task">
                          <EditIcon sx={{ color: "#bab9b9cc" }} />
                        </Tooltip>
                        <Tooltip title="Delete Task">
                          <DeleteIcon
                            onClick={() => deleteTask(allTask.taskId)}
                          />
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
