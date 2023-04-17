import SearchForm from "@/forms/SearchForm";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import empty from "../../../public/images/empty.png";
import Image from "next/image";

function Navbar() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();
  // const [user, setUser] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState();
  const [userExpanded, setUserExpanded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartProducts, setCartProducts] = useState();

  useEffect(() => {
    async function validateSession() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/verifyToken`, {
          token,
        })
        .then(async (res) => {
          console.log("RESPONSE HERE:", res.data);
          setIsUserLoggedIn(true);
          setIsLoading(false);
          return axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${res.data.data._id}`
            )
            .then((res) => {
              console.log("SECOND RES:", res.data);
              setUser(res.data.data);
            })
            .catch((err) => {
              console.log("ERROR HERE:", err);
            });
        })
        .catch((err) => {
          //   toast.error(err.response.data.message);
          // console.log("ERROR THERE:", err);
          // Router.push("/tailor/login");
          // toast.error(
          //   "Session expired. Please log in to continue to your dashboard."
          // );
          setIsLoading(false);
        });
    }
    validateSession();
  }, []);

  // const user = []

  return (
    <>
      <div className="overlay"></div>
      {/* {isCartOpen && (
        <div className="fixed min-w-screen min-h-screen bg-white shadow-lg p-20 z-40 right-0 top-0">
          <div className="mt-10">
            <div className="w-full flex justify-end">
              <FaTimes
                className="text-3xl text-black"
                onClick={() => setIsCartOpen(false)}
              />
            </div>
            <div className="w-full overflow-x-scroll lg:overflow-hidden mt-20 overflow-y-scroll">
              <div className="flex justify-between gap-x-10 min-w-[750px]">
                <span className="text-xs w-[187px] text-left text-gray-400 uppercase">
                  Product
                </span>
                <span className="text-xs w-[187px] text-left text-gray-400 uppercase">
                  Price
                </span>
                <span className="text-xs w-[187px] text-left text-gray-400 uppercase">
                  Actions
                </span>
              </div>

              {cartProducts?.length === 0 && (
                <div className="w-full mx-auto mt-10">
                  <Image
                    src={empty}
                    alt="Nothing here"
                    className="mx-auto"
                    width={150}
                  />
                  <h3 className="text-center">
                    Your cart is empty... Try adding a product to your cart.
                  </h3>
                </div>
              )}

              {cartProducts?.map((product) => (
                <div
                  onClick={() => {
                    setCurrentItem(product);
                    setIsDetailModalOpen(true);
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
                  <span className="text-sm w-[187px]">
                    <button>
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="ml-5"
                    >
                      {isLoading ? (
                        <span className="text-sm text-[tomato]">
                          deleting...
                        </span>
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
      )} */}
      <div className="top">
        <span>
          <i className="select fa-solid fa-search sIcon" id="ic" />
          <SearchForm />
        </span>
        <Link href="/" className="logo h-14 my-auto">
          Ap<span style={{ color: "tomato" }}>p</span>_arel
        </Link>
        {isUserLoggedIn && (
          <span className="userInteraction flex gap-x-7 mt-10">
            <Link href="/wishlist" className="">
              <FaHeart className="text-lg" />
            </Link>
            <span className="">
              <FaShoppingCart className="text-lg" onClick={() => setIsCartOpen(true)} />
            </span>
          </span>
        )}
      </div>
      <hr />
      <div className="w-full px-14 py-8 text-center">
        <div className="w-full flex justify-center gap-x-24">
          <Link
            href="https://apps.apple.com/ng/app/tryo-virtual-try-on-ar-app/id1640247631"
            target="_blank"
          >
            AR
          </Link>
          <Link href="/tailor/register" className="nav-link">
            TAILORS
          </Link>
          <Link href="/products/browse" className="nav-link">
            BROWSE PRODUCTS
          </Link>
          {!isUserLoggedIn && (
            <>
              <Link href="/register" className="nav-link">
                REGISTER
              </Link>
              <Link href="/login" className="nav-link">
                LOGIN
              </Link>
            </>
          )}
          {isUserLoggedIn && (
            <>
              <span
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
                }}
                className="nav-link cursor-pointer"
              >
                LOG OUT
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
