import React, { useContext, useEffect, useState } from "react";
import {
  FaInfoCircle,
  FaPencilAlt,
  FaSpinner,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { Fade } from "react-reveal";
import Image from "next/image";
import empty from "../../../../public/images/empty.png";
import { TailorContext } from "../TailorDashboard";
import axios from "axios";
import Modal from "react-modal";
import CreateNewProductForm from "@/forms/CreateNewProductForm";

function TailorViewProducts(props) {
  const [isToolTipHidden, setIsToolTipHidden] = useState(true);
  const [products, setProducts] = useState();
  const [currentItem, setCurrentItem] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const { tailor } = useContext(TailorContext);

  console.log("TAILORDDDD::", tailor?._id);

  useEffect(() => {
    async function fetchProducts() {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/tailors/get-products/${tailor?._id}`
        )
        .then((res) => {
          console.log("PRODUCTS RESPONSE:", res.data);
          setProducts(res.data.data);
        })
        .catch((err) => {
          console.log("ERROR HERE:", err);
        });
    }

    fetchProducts();
  }, [tailor]);

  //   Modal Configs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  useEffect(() => {
    Modal.setAppElement("#appElement");
  }, []);
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  //   TO-DO: REFACTOR CODE TO ENABLE SINGLE HANDLING OF MODALS
  function openDetailModal() {
    setIsDetailModalOpen(true);
  }
  function closeDetailModal() {
    setIsDetailModalOpen(false);
  }

  async function deleteProduct(productId) {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}/products/delete/${productId}/${tailor?._id}`
      )
      .then((res) => {
        console.log("PRODUCTS RESPONSE:", res.data);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR HERE:", err);
      });
  }
  return (
    <div>
      {/* PRODUCT DETAIL MODAL */}
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={closeDetailModal}
        className="bg-red-500 max-w-lg mx-auto mt-[120px]"
      >
        <div className="h-auto max-h-[450px] overflow-y-scroll shadow-lg p-14 bg-white text-center">
          <h2 className="font-semibold text-lg">Product Details</h2>
          <p className="text-sm mt-10 uppercase text-gray-400">Product name:</p>
          <p className="text-sm mt-2">{currentItem?.productName}</p>
          <div className="mt-12 w-full">
            <h2 className="text-sm mt-10 uppercase text-gray-400">
              Product Image
            </h2>
            <Image src={currentItem?.image} alt={currentItem?.productName} width={50} height={50} className="text-sm text-center mx-auto mt-2" />
          </div>
          <div className="mt-12">
            <h2 className="text-sm mt-10 uppercase text-gray-400">
              Product description
            </h2>
            <p className="text-sm mt-2">{currentItem?.productDescription  }</p>
          </div>
          <div className="mt-12">
            <h2 className="text-sm mt-10 uppercase text-gray-400">
              Price
            </h2>
            <p className="text-sm mt-2">{currentItem?.price}</p>
          </div>
          <div className="mt-12">
            <h2 className="text-sm mt-10 uppercase text-gray-400">
              Production Duration
            </h2>
            <p className="text-sm mt-2">{currentItem?.productionDuration}</p>
          </div>
          <div className="mt-12">
            <h2 className="text-sm mt-10 uppercase text-gray-400">
              Type of Material Needed
            </h2>
            <p className="text-sm mt-2">{currentItem?.typeOfMaterialNeeded}</p>
          </div>
        </div>
      </Modal>

      {/* MAIN CONTENT */}
      <div className="flex mt-14 relative justify-between lg:justify-start lg:gap-x-10 border-b-[.5px] pb-3">
        <div className="flex gap-x-5">
          <h1 className="text-xl font-bold my-auto ">
            Products - {products?.length}
          </h1>
          <FaInfoCircle
            size={13}
            className="text-slate-600 my-auto cursor-pointer"
            onClick={() => setIsToolTipHidden(false)}
          />
        </div>
        {!isToolTipHidden && (
          <Fade duration={500}>
            <div className="text-sm max-w-xs absolute -top-24 left-20 bg-white drop-shadow-lg shadow-sm rounded-lg p-5">
              <div className="relative w-full flex justify-between mb-2">
                <p className="text-sm text-gray-400">TOOLTIP ✨</p>
                <FaTimes
                  size={10}
                  className="cursor-pointer"
                  onClick={() => setIsToolTipHidden(true)}
                />
              </div>
              <p>Click on a product to see more details about it.</p>
            </div>
          </Fade>
        )}
        {/* <button
            onClick={openModal}
            className="text-sm my-auto flex gap-2 border-gray-400 border-[.5px] border-dotted p-2"
          >
            <span className="my-auto">Add new</span>
            <FaPlus className="my-auto" />
          </button> */}
      </div>
      {/* OTHER DETAILS ABOUT PROJECT */}
      <div className="mt-10">
        {/* RequirementCard */}
        <div className="w-full overflow-x-scroll lg:overflow-hidden">
          <div className="flex justify-between gap-x-10 min-w-[750px]">
            <span className="text-xs w-[187px] text-left text-gray-400 uppercase">
              Image
            </span>
            <span className="text-xs w-[187px] text-left text-gray-400 uppercase">
              Product name
            </span>
            <span className="text-xs w-[187px] text-left text-gray-400 uppercase">
              Price
            </span>
            <span className="text-xs w-[187px] text-left text-gray-400 uppercase">
              Actions
            </span>
          </div>

          {products?.length === 0 && (
            <div className="w-full mx-auto mt-10">
              <Image
                src={empty}
                alt="Nothing here"
                className="mx-auto"
                width={150}
              />
              <h3 className="text-center">
                It's lonely here... Try adding a new product to your store.
              </h3>
            </div>
          )}

          {products?.map((product) => (
            <div
              onClick={() => {
                setCurrentItem(product);
                setIsDetailModalOpen(true)
              }}
              key={product._id}
              className="flex cursor-pointer gap-x-10 mt-7 border-b-[.5px] pb-3 justify-between min-w-[750px]"
            >
              <span className="text-sm">
                <Image
                  loading="eager"
                  unoptimized
                  src={product?.image}
                  alt={product?.productName}
                  className="w-[40px] h-[40px] object-cover inline-block"
                  width={10}
                  height={10}
                />
              </span>
              <span className="text-sm w-[187px] text-center">
                {product?.productName}
              </span>
              <span className="text-sm w-[187px] text-center">
                ₦{product?.price}
              </span>
              {/* <span className="text-sm w-[187px] text-center">{product?.source}</span> */}
              <span className="text-sm w-[187px]">
                <button>
                  {/* <FaPencilAlt size={14} className="text-blue-500" /> */}
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="ml-5"
                >
                  {isLoading ? (
                    <span className="text-sm text-[tomato]">deleting...</span>
                  ) : (
                    <FaTrashAlt size={14} className="text-red-500" />
                  )}
                </button>
              </span>
            </div>
          ))}

          <ol className="mt-5 w-[750px] max-w-[750px]"></ol>
        </div>
      </div>
    </div>
  );
}

export default TailorViewProducts;
