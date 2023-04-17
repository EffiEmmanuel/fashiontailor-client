import PreviewImage from "@/components/PreviewImage";
import { TailorContext } from "@/components/Tailor/TailorDashboard";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfileFormSchema from "./validation";

function EditProfileForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  console.log('PROPS:::', props.tailor)

  //   User Context
  const { tailor, setTailor } = useContext(TailorContext);

  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/tailors/${tailor?._id}`,
        values
      )
      .then((res) => {
        console.log("RES:", res);
        toast.success("Your details were updated successfully!");
        setIsLoading(false);
        setTailor(res.data.data)
      }).catch(err => {
        console.log("RES:", res);
        toast.error(err.message);
        setIsLoading(false);
      });
  };

  const firstName = props.tailor?.firstName


  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        firstName: `${tailor?.firstName}`,
        lastName: props?.tailor?.lastName,
        email: props?.tailor?.email,
        telephoneNumber: props?.tailor?.telephoneNumber,
      },
      validationSchema: EditProfileFormSchema,
      onSubmit,
    });

  console.log('VALUES:', values)

  return (
    <form className="" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="">
        <div className="flex flex-col justify-between gap-x-20 w-full">
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="firstName"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              First Name
            </label>
            <input
              className="w-full h-12 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="firstName"
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="First name"
            />

            <p className="text-left mt-3 text-xs">
              {errors.firstName ? errors.firstName : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="lastName"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Last Name
            </label>
            <input
              className="w-full h-12 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="lastName"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="Last name"
            />

            <p className="text-left mt-3 text-xs">
              {errors.lastName ? errors.lastName : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Email Address
            </label>
            <input
              className="w-full h-12 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="abc@eample.com"
            />

            <p className="text-left mt-3 text-xs">
              {errors.email ? errors.email : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="telephoneNumber"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Phone Number
            </label>
            <input
              className="w-full h-12 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="telephoneNumber"
              type="tel"
              name="telephoneNumber"
              value={values.telephoneNumber}
              onChange={handleChange}
              placeholder="+23481234567890"
            />

            <p className="text-left mt-3 text-xs">
              {errors.telephoneNumber ? errors.telephoneNumber : ""}
            </p>
          </div>
        </div>

        <div className="w-full mt-5">
          <button
            type="submit"
            className="bg-[tomato] text-white h-12 w-44 px-8 rounded-lg -mb-24 rounded-br-lg text-sm hover:bg-gray-700 hover:border-black"
          >
            {isLoading ? (
              <FaSpinner className="text-white animate-spin my-auto mx-auto text-center text-lg" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
