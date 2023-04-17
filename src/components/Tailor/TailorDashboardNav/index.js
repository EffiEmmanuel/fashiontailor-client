import Link from "next/link";
import Image from "next/image";
import {
  FaBug,
  FaHeadset,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
// import effi from "../../../../public/images/effi.jpg";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function TailorDashboardNav({ isNavHidden, engineer }) {
  const router = useRouter()

  const urlBreakdown = window.location.href.split("/");
  console.log("URLBREAKDOWN:::", urlBreakdown);
  return (
    <nav
      className={`bg-cosretBlue-300 text-white md:w-1/4 lg:w-1/5 z-10 fixed w-2/4 min-h-screen lg:block px-10 pt-20 top-0 left-0 ${
        isNavHidden ? "hidden" : "block"
      }`}
    >
      <h2 className="-ml-[0px] font-bold text-black text-xl logo">
        APP<span className="text-[tomato]">_</span>AREL
      </h2>
      <ul className="mt-14">
        {/* CATEGORY */}
        <li className="my-11">
          <p
            className={`text-xs font-bold ${
              urlBreakdown[urlBreakdown.length - 1] === "dashboard"
                ? "text-black"
                : "text-gray-500"
            } uppercase`}
          >
            Overview
          </p>
          {/* ITEMS */}
          <ul className="mt-3">
            <li className="ml-7">
              <Link
                href="/tailor/dashboard"
                className="flex align-middle gap-2"
              >
                <FaHome
                  size={16}
                  className={`my-auto ${
                    urlBreakdown[urlBreakdown.length - 1] === "dashboard"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                />
                <span
                  className={`my-auto text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "dashboard"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                >
                  Home
                </span>
              </Link>
            </li>
          </ul>
        </li>
        {/* CATEGORY */}
        <li className="my-11">
          <p
            className={`text-xs font-bold ${
              urlBreakdown[urlBreakdown.length - 2] === "business"
                ? "text-black"
                : "text-gray-500"
            } uppercase`}
          >
            Business
          </p>
          {/* ITEMS */}
          <ul className="mt-3">
            <li className="ml-7">
              <Link
                href={`/tailor/dashboard/business/add-product`}
                className="flex align-middle border-b-[.5px] pb-3 my-5 gap-2 ..."
              >
                <FaPlus
                  className={`text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "add-product"
                      ? "text-[tomato]"
                      : "text-black"
                  } `}
                />
                <span
                  className={`my-auto text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "add-product"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                >
                  Add Product
                </span>
              </Link>
            </li>
            <li className="ml-7">
              <Link
                href={`/tailor/dashboard/business/view-products`}
                className="flex align-middle border-b-[.5px] pb-3 my-5 gap-2 ..."
              >
                <FaShoppingCart
                  className={`text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "view-products"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                />
                <span
                  className={`my-auto text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "view-products"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                >
                  View Products
                </span>
              </Link>
            </li>
          </ul>
        </li>

        {/* CATEGORY */}
        <li className="my-11">
          <p
            className={`text-xs uppercase ${
              urlBreakdown[urlBreakdown.length - 1] === "support" ||
              urlBreakdown[urlBreakdown.length - 1] === "report-a-problem"
                ? "text-black"
                : "text-gray-500"
            }`}
          >
            Help & Support
          </p>
          {/* ITEMS */}
          <ul className="mt-3">
            <li className="ml-7">
              <Link href="mailto:@effiemmanuel.n@gmail.com" className="flex align-middle gap-2">
                <FaHeadset
                  size={16}
                  className={`my-auto ${
                    urlBreakdown[urlBreakdown.length - 1] === "support"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                />
                <span
                  className={`my-auto text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "support"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                >
                  Support
                </span>
              </Link>
            </li>
            <li className="ml-7">
              <Link href="mailto:@effiemmanuel.n@gmail.com" className="flex align-middle gap-2 mt-4">
                <FaBug
                  size={16}
                  className={`my-auto ${
                    urlBreakdown[urlBreakdown.length - 1] === "report-a-problem"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                />
                <span
                  className={`my-auto text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "report-a-problem"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                >
                  Report a problem
                </span>
              </Link>
            </li>
          </ul>
        </li>

        {/* CATEGORY */}
        <li className="my-11">
          <p
            className={`text-xs ${
              urlBreakdown[urlBreakdown.length - 2] === "account"
                ? "text-black"
                : "text-gray-500"
            } uppercase`}
          >
            Account
          </p>
          {/* ITEMS */}
          <ul className="mt-3">
            <li className="ml-7">
              <Link
                href="/tailor/dashboard/account/profile"
                className="flex align-middle gap-2 mt-4"
              >
                <FaUserAlt
                  className={`my-auto text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "profile"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}
                />
                <span className={`my-auto text-sm ${
                    urlBreakdown[urlBreakdown.length - 1] === "profile"
                      ? "text-[tomato]"
                      : "text-black"
                  }`}>Profile</span>
              </Link>
            </li>
            <li className="ml-7">
              <Link href="#" onClick={() => {
                localStorage.removeItem('tailor-token')
                router.push('/tailor/login')
              }} className="flex align-middle gap-2 mt-4">
                <FaSignOutAlt size={16} className="my-auto text-sm" />
                <span className="my-auto text-sm">Log out</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
