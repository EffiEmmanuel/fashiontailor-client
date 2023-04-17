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

function TailorDetilsPage() {
  const router = useRouter();
  const { tailorId } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [tailor, setTailor] = useState();

  useEffect(() => {
    async function fetchTailor() {
      if (tailorId) {
        await axios
          .get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/tailors/${tailorId}`)
          .then((res) => {
            console.log("RESPONSE TAILOR::", res.data.data);
            setIsLoading(false);
            setTailor(res.data.data);
          })
          .catch((err) => {
            console.log("ERROR:", err);
            setIsLoading(false);
          });
      }
    }

    fetchTailor();
  }, [router.query.tailorId]);

  return (
    <Layout>
      {/* HERO SECTION */}
      <div className="w-full flex justify-center">
        {tailor && (
          <Image src={tailor?.profileImage} className="rounded-full max-w-lg object-cover w-60 h-60" width={100} height={100} alt={tailor?.firstName} />
        )}
      </div>

      <div className="w-2/4 flex justify-between mx-auto flex-wrap align-middle">
        {tailor && (
          <div className="w-full">
            <div className="p-10">
              <p className="font-bold text-4xl text-center">
                {tailor?.firstName} {tailor?.lastName}
              </p>

              <div className="flex gap-x-7 w-full justify-center mt-10">
                <Link
                  href={`mailto:@${tailor?.email}`}
                  className="bg-[tomato] text-white w-32 h-14 rounded-lg px-8 py-2 flex gap-x-3"
                >
                  <FaEnvelope className="text-lg my-auto" />
                  <span className="my-auto">Email</span>
                </Link>
                <Link
                  href={`tel:${tailor?.telephoneNumber}`}
                  className="border-[1px] border-[tomato] text-black w-32 h-14 rounded-lg px-8 py-2 flex gap-x-3"
                >
                  <FaPhoneAlt className="text-lg my-auto" />
                  <span className="my-auto">Call</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex p-20 justify-between mx-auto flex-wrap align-middle">
        {tailor && (
          <div className="w-full">
            <div className="mt-20 border-b-[.5px] border-b-gray-300 pb-5">
              <h3 className="text-4xl font-semibold text-[tomato]">Bio</h3>
              <p className="my-3">{tailor?.bio}</p>
            </div>

            <div className="w-full">
              <div className="mt-32 w-full">
                <h3 className="text-4xl font-semibold text-[tomato]">
                  Catalog
                </h3>
                <div className="flex flex-wrap py-20 justify-between">
                  {tailor?.products?.map((product) => (
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
                          <p className="font-bold text-lg">
                            {product?.productName}
                          </p>
                          <p className="text-sm my-2">
                            Tailor:{" "}
                            <Link
                              href={`/tailors/store/${product?.tailor?._id}`}
                              className="underline text-white"
                            >
                              {product?.tailor?.firstName}{" "}
                              {product?.tailor?.lastName}
                            </Link>{" "}
                          </p>
                          <p className="text-3xl my-5">
                            ₦{product?.price.toLocaleString("en-US")}
                          </p>
                          <div className="w-full flex justify-between align-middle mt-5">
                            <FaHeart className="text-2xl my-auto" />
                            <FaCartPlus className="text-2xl my-auto" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
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

export default TailorDetilsPage;
