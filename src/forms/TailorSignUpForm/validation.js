import * as yup from "yup";

const requiredField = "* This field is required";
const TailorSignUpSchema = yup.object().shape({
  firstName: yup.string().required(requiredField),
  lastName: yup.string().required(requiredField),
  bio: yup.string().required(requiredField),
  email: yup
    .string()
    .email("Email address must be in format name@emample.com")
    .required(requiredField),
  telephoneNumber: yup
    .string()
    .required(requiredField),
  password: yup
    .string()
    .min(
      8,
      "Please provide a stronger password. Password cannot be less than 8 characters"
    )
    .required(requiredField),
});

export default TailorSignUpSchema;
