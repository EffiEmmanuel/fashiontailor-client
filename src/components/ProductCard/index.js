import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard({ product, userId }) {
  const [isLoading, setIsLoading] = useState(false);

  async function addToCart() {
    setIsLoading(true);
    const isUserLoggedIn = localStorage.getItem("token");
    if (isUserLoggedIn) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/users/add-to-cart/${product?._id}/${userId}`
        )
        .then((res) => {
          setIsLoading(false);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log("ERROR:", err);
          setIsLoading(false);
          toast.error(err.message);
        });
    } else {
      toast.info("You must be logged in to add products to cart");
    }
  }

  async function likeProduct() {
    setIsLoading(true);
    const isUserLoggedIn = localStorage.getItem("token");
    if (isUserLoggedIn) {
      await axios
        .patch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}/users/like-product/${product?._id}/${userId}`
        )
        .then((res) => {
          setIsLoading(false);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log("ERROR:", err);
          setIsLoading(false);
          toast.success(err.message);
        });
    } else {
      toast.info("You must be logged in to add products to your wishlist");
    }
  }
  return (
    <span className="w-1/4 hover:scale-105 text-white transition-all duration-300">
      <ToastContainer />
      <div className="w-full shadow-2xl min-h-250px text-white max-h-250px rounded-lg">
        <Link href={`/products/${product?._id}`}>
          <div className="w-full ">
            <Image
              src={product?.image}
              alt={product?.productName}
              className="w-full h-[250px] object-cover"
              width={100}
              height={100}
            />
          </div>
        </Link>

        <div className="p-10 bg-[tomato] text-white">
          <Link href={`/products/${product?._id}`}>
            <p className="font-bold text-white text-lg ... line-clamp-1">
              {product?.productName}
            </p>
            <p className="text-sm text-white my-2">
              Tailor:{" "}
              <Link
                href={`/tailors/store/${product?.tailor?._id}`}
                className="underline text-white"
              >
                {product?.tailor?.firstName} {product?.tailor?.lastName}
              </Link>{" "}
            </p>
            <p className="text-3xl text-white my-5">
              ₦{product?.price.toLocaleString("en-US")}
            </p>
          </Link>
        </div>
          <div className="w-full flex justify-between align-middle bg-[tomato] text-white p-10 -mt-12">
            <FaHeart onClick={likeProduct} className="text-2xl my-auto" />
            <FaCartPlus onClick={addToCart} className="text-2xl my-auto" />
          </div>
      </div>
    </span>
  );
}

export default ProductCard;
