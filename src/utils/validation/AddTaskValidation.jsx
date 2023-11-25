import * as Yup from "yup";
export const initialValues = {
  title: "",
};

export const taskvalidation = Yup.object({
  title: Yup.string().required("Task name is required"),
});