import TailorDashboard from "@/components/Tailor/TailorDashboard";
import TailorDashboardHome from "@/components/Tailor/TailorDashboardHome";
import TailorEditProfile from "@/components/Tailor/TailorEditProfile";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfilePage() {
  //   Protect Dashboard page
  const Router = useRouter();
  const [loading, setIsLoading] = useState(true);
  const [isTailorLoggedIn, setIsTailorLoggedIn] = useState(false);

  useEffect(() => {
    async function validateSession() {
      const token = localStorage.getItem("tailor-token");
      if (!token) {
        Router.push("/tailor/login");
        //   setIsLoading(false);
        return toast.error("You must be logged in.");
      }

      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/verifyToken`, {
          token,
        })
        .then((res) => {
          console.log("RESPONSE:", res.data);
          setIsTailorLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(
            "Session expired. Please log in to continue to your dashboard."
          );
          Router.push("/tailor/login");
          setIsLoading(false);
        });
    }
    validateSession();
  }, []);

  return (
    <>
      <ToastContainer />
      {isTailorLoggedIn && (
        <TailorDashboard>
          <div></div>
          <TailorEditProfile />
        </TailorDashboard>
      )}
    </>
  );
}

export default EditProfilePage;
