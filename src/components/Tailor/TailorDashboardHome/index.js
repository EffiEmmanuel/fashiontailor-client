// import ValueCard from "@/components/ValueCard";
import StatCard from "@/components/StatCard";
import { useContext, useEffect } from "react";
import { FaBell, FaRegBell, FaShoppingCart, FaUserAlt, FaPaintBrush } from "react-icons/fa";
// import effi from "../../../../public/images/effi.jpg";
import { TailorContext } from "../TailorDashboard";

export default function TailorDashboardHome() {
  const { tailor } = useContext(TailorContext);
  useEffect(() => {
    async function getStatistics() {}
  }, []);
  return (
    <>
      {/* LATEST ACTIVITY */}
      <section className="mt-20">
        <h1 className="text-xl font-bold ">Statistics</h1>

        <div className="flex flex-wrap gap-10">
          {/* <StatCard
            icon={<FaUserAlt className="text-lg" />}
            title="10"
            description="Users"
          />

          <StatCard
            icon={<FaPaintBrush className="text-lg" />}
            title="10"
            description="Tailors"
          /> */}

          <StatCard
            icon={<FaShoppingCart className="text-lg" />}
            title={tailor?.products?.length}
            description="Products"
          />

        </div>
      </section>
    </>
  );
}
