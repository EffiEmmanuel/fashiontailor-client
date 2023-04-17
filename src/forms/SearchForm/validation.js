import * as yup from "yup";

const requiredField = "* This field is required";
const SearchFormSchema = yup.object().shape({
  searchQuery: yup.string().required(requiredField),
});

export default SearchFormSchema;
