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
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";

function SearchPage() {
  const router = useRouter();
  const { searchQuery } = router.query;

  console.log("ROUTER.QUERY::", router.query);
  console.log("ROUTER.QUERY::", searchQuery);

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetchProducts() {
      if (searchQuery) {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL_API}/products/search?searchQuery=${searchQuery}`
          )
          .then((res) => {
            console.log("RESPONSE SEARCH::", res.data.data);
            setIsLoading(false);
            setProducts(res.data.data);
          })
          .catch((err) => {
            console.log("ERROR:", err);
            setIsLoading(false);
          });
      }
    }

    fetchProducts();
  }, [router.query.searchQuery]);

  return (
    <Layout>
      {/* HERO SECTION */}

      <section className="w-full text-center mb-72">
        <h1 className="text-5xl text-black">
          Search results for{" "}
          <span className="text-[tomato]">"{searchQuery}"</span>
        </h1>
        {/* CONTACT US FORM */}
        <div className="mt-16"></div>
      </section>
      <div></div>

      <div className="w-full flex justify-between flex-wrap align-middle px-20 -mt-20">
        {products?.map((product) => (
          <Link
            href={`/products/${product?._id}`}
            className="w-1/4 hover:scale-105 transition-all duration-300"
          >
            <div className="w-full shadow-2xl min-h-250px max-h-250px rounded-lg">
              <div className="w-full">
                <Image
                  src={product?.image}
                  alt={product?.productName}
                  className="w-full h-[250px] object-cover"
                  width={100}
                  height={100}
                />
              </div>

              <div className="p-10 bg-[tomato] text-white">
                <p className="font-bold text-lg">{product?.productName}</p>
                <p className="text-sm my-2">
                  Tailor:{" "}
                  <Link
                    href={`/tailors/store/${product?.tailor?._id}`}
                    className="underline text-white"
                  >
                    {product?.tailor?.firstName} {product?.tailor?.lastName}
                  </Link>{" "}
                </p>
                <p className="text-3xl my-5">₦{product?.price.toLocaleString('en-US')}</p>
                <div className="w-full flex justify-between align-middle mt-5">
                  <FaHeart className="text-2xl my-auto" />
                  <FaCartPlus className="text-2xl my-auto" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER */}
      {/* <Footer /> */}
    </Layout>
  );
}

export default SearchPage;
