import HeadingAndSubtext from "@/components/HeadingAndSubtext";
import Layout from "@/components/Layout";
import TailorLoginForm from "@/forms/TailorLoginForm";
import UserLoginForm from "@/forms/UserLoginForm";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaCartPlus,
  FaEnvelope,
  FaHeart,
  FaPhoneAlt,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";

function ProductDetilsPage() {
  const router = useRouter();
  const { productId } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();

  useEffect(() => {
    async function fetchProduct() {
      if (productId) {
        await axios
          .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products/${productId}`)
          .then((res) => {
            console.log("RESPONSE SEARCH::", res.data.data);
            setIsLoading(false);
            setProduct(res.data.data);
          })
          .catch((err) => {
            console.log("ERROR:", err);
            setIsLoading(false);
          });
      }
    }

    fetchProduct();
  }, [router.query.productId]);

  return (
    <Layout>
      {/* HERO SECTION */}
      <div></div>

      <div className="w-2/4 flex justify-between mx-auto flex-wrap align-middle">
        {product && (
          <div className="w-full">
            <div className="w-full">
              <Image
                src={product?.image}
                alt={product?.productName}
                className="w-full max-h-fit object-cover"
                width={100}
                height={100}
              />
            </div>

            <div className="p-10">
              <p className="font-bold text-lg ... line-clamp-1">{product?.productName}</p>
              <p className="text-sm my-2">
                Tailor:{" "}
                <Link
                  href={`/tailors/store/${product?.tailor?._id}`}
                  className="underline"
                >
                  {product?.tailor?.firstName} {product?.tailor?.lastName}
                </Link>{" "}
              </p>
              <p className="text-3xl my-5">
                ₦{product?.price.toLocaleString("en-US")}
              </p>
              <div className="w-full flex justify-between align-middle mt-5 border-b-[.5px] border-b-gray-300 pb-10">
                <FaRegHeart className="text-2xl my-auto" />
                <FaShoppingCart className="text-2xl my-auto" />
              </div>

              <div className="mt-20 border-b-[.5px] border-b-gray-300 pb-5">
                <h3 className="text-4xl font-semibold text-[tomato]">Description</h3>
                <h3 className="my-3">{product?.productDescription}</h3>
                <h3 className="my-3">
                  <span className="font-bold">Production duration:</span>{" "}
                  {product?.productionDuration} days
                </h3>
              </div>

              <div className="mt-12">
                <h3 className="text-4xl font-semibold text-[tomato]">Contact Tailor</h3>
                <Link href={`tel:${product?.tailor?.telephoneNumber}`} className="underline flex gap-x-3 align-middle my-3">
                  <FaPhoneAlt className="text-sm my-auto" />
                  {product?.tailor?.telephoneNumber}
                </Link>
                <Link href={`mailto:@${product?.tailor?.email}`} className="underline flex gap-x-3 align-middle my-3">
                  <FaEnvelope className="text-sm my-auto" />
                  {product?.tailor?.email}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      {/* <Footer /> */}
    </Layout>
  );
}

export default ProductDetilsPage;
