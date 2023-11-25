import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SweetAlert } from "../components/library/SweetAlert";

const UserApi = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_USER}/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log(response.data);
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      SweetAlert("Success", "User logged out successfully", "success");

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      SweetAlert("Oops", error.message, "error");
    }
  };

  const logoutUserFromAllDevice = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_USER}/logoutFomAllDevices`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log(response.data);
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      SweetAlert(
        "Success",
        "User logged out successfully from all devices",
        "success"
      );

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      SweetAlert("Oops", error.message, "error");
    }
  };
  return { logoutUser, logoutUserFromAllDevice };
};

export default UserApi;
