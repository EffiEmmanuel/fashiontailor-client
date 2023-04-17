import HeadingAndSubtext from "@/components/HeadingAndSubtext";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
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

function BrowsePage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchProducts() {
      if (searchQuery) {
        await axios
          .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products`)
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

  useEffect(() => {
    const JSONUser = localStorage.getItem("user");
    const user = JSON.parse(JSONUser)
    setUser(user);
    console.log('USER::::::', user?._id)
  }, []);

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="w-full text-center mb-72">
        <h1 className="text-3xl text-[tomato] font-bold max-w-lg mx-auto text-center">
          Browse through our vast catalog of luxury wears
        </h1>
        {/* CONTACT US FORM */}
        <div className="mt-16"></div>
      </section>
        <div></div>

      <div className="w-full flex gap-20 flex-wrap align-middle px-20 -mt-20">
        {products?.map((product) => (
          <ProductCard product={product} userId={user?._id} />
        ))}
      </div>

      {/* FOOTER */}
      {/* <Footer /> */}
    </Layout>
  );
}

export default BrowsePage;
