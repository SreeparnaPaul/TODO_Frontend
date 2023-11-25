import * as Yup from "yup";
export const initialValues = {
  title: "",
  description: "",
};

export const taskvalidation = Yup.object({
  title: Yup.string().required("Task name is required"),
  description: Yup.string().required("Task description is required"),
});
