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
import CreateNewProductFormSchema from "./validation";

function CreateNewProductForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  //   User Context
  const { tailor } = useContext(TailorContext);

  console.log("TAILOR:", tailor);
  // Image state
  const [productImage, setProductImage] = useState("");

  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", productImage);
    formData.append("upload_preset", "effiemmanuel");

    await axios
      .post(
        "https://api.cloudinary.com/v1_1/effi-emmanuel/image/upload",
        formData
      )
      .then(async (res) => {
        console.log("RES:", res.data.url);

        return await axios
          .post(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/products?tailorId=${tailor?._id}`,
            {
              ...values,
              image: res.data.url,
            }
          )
          .then((res) => {
            console.log("RES:", res);
            toast.success("Product added successfully!");
            setIsLoading(false);
            actions.resetForm()
          });
      })
      .catch((err) => {
        console.log("err:", err);
        toast.error(err.message);
        setIsLoading(false);
      });
  };

  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        // image: "",
        productName: "",
        productDescription: "",
        price: 0,
        productionDuration: 1,
        typeOfMaterialNeeded: "",
      },
      validationSchema: CreateNewProductFormSchema,
      onSubmit,
    });
  return (
    <form className="" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="">
        <div className="flex flex-col justify-between gap-x-20 w-full">
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="image"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Product Image
            </label>
            <input
              className="w-full -ml-8 h-12 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="image"
              type="file"
              name="image"
              value={values.image}
              onChange={(e) => {
                setProductImage(e.target.files[0]);
              }}
            />

            <p className="text-left mt-3 text-xs">
              {errors.image ? errors.image : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="productName"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Product Name
            </label>
            <input
              className="w-full h-12 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="productName"
              type="text"
              name="productName"
              value={values.productName}
              onChange={handleChange}
              placeholder="Product name"
            />

            <p className="text-left mt-3 text-xs">
              {errors.productName ? errors.productName : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="productDescription"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Product Description
            </label>
            <textarea
              className="w-full h-32 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="productDescription"
              name="productDescription"
              value={values.productDescription}
              onChange={handleChange}
              placeholder="A short description for your product"
            ></textarea>
            <p className="text-left mt-3 text-xs">
              {errors.productDescription ? errors.productDescription : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="price"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Price (₦)
            </label>
            <input
              className="w-full h-12 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="price"
              type="number"
              name="price"
              value={values.price}
              onChange={handleChange}
              placeholder="Price"
            />

            <p className="text-left mt-3 text-xs">
              {errors.price ? errors.price : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="productionDuration"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Production Duration (days)
            </label>
            <input
              className="w-full h-12 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="productionDuration"
              type="number"
              name="productionDuration"
              value={values.productionDuration}
              onChange={handleChange}
              placeholder="productionDuration"
            />

            <p className="text-left mt-3 text-xs">
              {errors.productionDuration ? errors.productionDuration : ""}
            </p>
          </div>
          <div className="md:max-w-xl w-full relative my-3">
            <label
              htmlFor="typeOfMaterialNeeded"
              className="text-xs font-bold uppercase text-[#C9C9C9] absolute left-0"
            >
              Type of material needed
            </label>
            <input
              className="w-full h-12 bg-cosretBlue-300 px-8 text-black text-sm mt-7 rounded-lg rounded-bl-lg focus:outline-none"
              id="typeOfMaterialNeeded"
              type="text"
              name="typeOfMaterialNeeded"
              value={values.typeOfMaterialNeeded}
              onChange={handleChange}
              placeholder="Eg. Ankara, Polyester..."
            />

            <p className="text-left mt-3 text-xs">
              {errors.typeOfMaterialNeeded ? errors.typeOfMaterialNeeded : ""}
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
              "Add product"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateNewProductForm;
