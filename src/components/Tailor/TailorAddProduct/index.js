// import ValueCard from "@/components/ValueCard";
import CreateNewProductForm from "@/forms/CreateNewProductForm";
import { useContext } from "react";
import { FaBell, FaRegBell, FaRegBookmark } from "react-icons/fa";
// import effi from "../../../../public/images/effi.jpg";
import { TailorContext } from "../TailorDashboard";

export default function TailorAddProduct() {
  const { tailor } = useContext(TailorContext);
  return (
    <>
      {/* LATEST ACTIVITY */}
      <section className="mt-12">
        <div className="border-b-[.5px] pb-3">
          <h1 className="text-2xl font-bold ">Your Products</h1>
          <span className="text-sm text-[#000]">
            Here are all the products in your store
          </span>
        </div>

        <div className="mt-10">
          <CreateNewProductForm />
        </div>
      </section>
    </>
  );
}
