import { FaBars, FaTimes } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import TailorDashboardNav from "../TailorDashboardNav";
import { TailorContext } from "../TailorDashboard";

export default function TailorDashboardNavbar() {
  const [isNavHidden, setIsNavHidden] = useState(true);

  // Get user from user context
  const { tailor } = useContext(TailorContext);

  return (
    <>
      {/* Nabvar */}
      <div className="bg-[tomato] lg:hidden w-full flex justify-between px-10 py-7">
        <h2 className="font-bold text-white text-xl">APP_AREL</h2>
        <div className="lg:hidden">
          {isNavHidden ? (
            <FaBars
              size={25}
              color="#fff"
              className="cursor-pointer"
              onClick={() => setIsNavHidden(false)}
            />
          ) : (
            <FaTimes
              size={25}
              color="#fff"
              className="cursor-pointer"
              onClick={() => setIsNavHidden(true)}
            />
          )}
        </div>
      </div>

      <TailorDashboardNav
        tailor={tailor}
        isNavHidden={isNavHidden}
        setIsNavHidden={setIsNavHidden}
      />
    </>
  );
}
