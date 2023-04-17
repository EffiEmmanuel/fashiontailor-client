import TailorDashboardNavbar from "../TailorDashboardNavbar";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import TailorDahboardTopBar from "../TailorDashboardTopBar";

// Estabishing Connection with socket.io
// const socket = io.connect("http://localhost:3001");

// Creating a user context to manage state
export const TailorContext = createContext();

function TailorDashboard(props) {
  const [tailor, setTailor] = useState();

  //   Current page
  const [currentPage, setCurrectPage] = useState("home");

  function setTheCurrentPage(page) {
    setCurrectPage(page);
  }

  //   Protect page
  const Router = useRouter();
  const [loading, setIsLoading] = useState(true);
  const [isTailorLoggedIn, setIsTailorLoggedIn] = useState(false);

  useEffect(() => {
    async function validateSession() {
      const token = localStorage.getItem("tailor-token");
      if (!token) {
        Router.push("/tailor/login");
        setIsLoading(false);
        return toast.error("You must be logged in.");
      }

      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/tailors/verifyToken`, {
          token,
        })
        .then(async (res) => {
          console.log("RESPONSE HERE:", res.data);
          setIsTailorLoggedIn(true);
          setIsLoading(false);
          console.log("TAILOR ID FRONTEND:", res.data.data._id);
          return axios
            .get(
              `${process.env.NEXT_PUBLIC_BASE_URL_API}/tailors/${res.data.data._id}`
            )
            .then((res) => {
              console.log("SECOND RES:", res.data);
              setTailor(res.data.data);
            })
            .catch((err) => {
              console.log("ERROR HERE:", err);
            });
        })
        .catch((err) => {
          //   toast.error(err.response.data.message);
          console.log("ERROR THERE:", err);
          Router.push("/tailor/login");
          toast.error(
            "Session expired. Please log in to continue to your dashboard."
          );
          setIsLoading(false);
        });
    }
    validateSession();
  }, []);

  return (
    <TailorContext.Provider
      value={{ tailor, currentPage, setTailor ,setTheCurrentPage }}
    >
      <ToastContainer />
      <TailorDashboardNavbar />
      {/* BODY */}
      <div className="p-10 lg:pl-[25%] scrollbar-thin">
        <TailorDahboardTopBar />
        {...props.children}
      </div>
    </TailorContext.Provider>
  );
}

export default TailorDashboard;
