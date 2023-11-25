import * as Yup from "yup";
export const initialValues = {
  email: "",
  password: "",
};
export const validation = Yup.object({
  email: Yup.string()
    .email("Enter a valid email id")
    .required("Email is required"),
  password: Yup.string().required("Password is required").min(3, "Password must be at least 3 characters")
  .max(30, "Password must be at most 30 characters"),
});