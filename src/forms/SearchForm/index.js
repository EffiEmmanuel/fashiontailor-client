import axios from "axios";
import { useFormik } from "formik";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpSchema from "./validation";
import SearchFormSchema from "./validation";
// import { redirect } from "next/navigation";

function SearchForm() {
  const [isLoading, setIsLoading] = useState(false);

  const Router = useRouter();
  const onSubmit = async (values, actions) => {
    console.log("hi:", values);
    Router.push(`/search?searchQuery=${values.searchQuery}`);
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      searchQuery: "",
    },
    validationSchema: SearchFormSchema,
    onSubmit,
  });
  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        className="look-up w-full h-16 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
        type="text"
        name="searchQuery"
        id="searchQuery"
        value={values.searchQuery}
        onChange={handleChange}
        placeholder="Search for a product"
      />

      <button
        type="submit"
        className="bg-[tomato] h-full my-7 py-5 px-5 text-white"
      >
        <FaSearch className="text-lg" />
      </button>
      {errors.searchQuery && <p className="text-sm block">{errors.searchQuery}</p>}
    </form>
  );
}

export default SearchForm;
