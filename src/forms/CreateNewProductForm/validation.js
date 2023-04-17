import * as yup from "yup";

const requiredField = "* This field is required";
const CreateNewProjectFormSchema = yup.object().shape({
  productName: yup.string().required(requiredField),
  productDescription: yup.string().required(requiredField),
  price: yup.number().required(requiredField),
  productionDuration: yup.number().required(requiredField),
  typeOfMaterialNeeded: yup.string().required(requiredField),
});

export default CreateNewProjectFormSchema;
