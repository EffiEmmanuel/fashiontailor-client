import * as yup from "yup";

const requiredField = "* This field is required";
const EditProfileFormSchema = yup.object().shape({
  firstName: yup.string().required(requiredField),
  lastName: yup.string().required(requiredField),
  email: yup
    .string()
    .email("Email address must be in format name@emample.com")
    .required(requiredField),
  telephoneNumber: yup
    .string()
    .required(requiredField),
});

export default EditProfileFormSchema;
