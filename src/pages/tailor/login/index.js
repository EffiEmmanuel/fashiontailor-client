import HeadingAndSubtext from "@/components/HeadingAndSubtext";
import Layout from "@/components/Layout";
import TailorLoginForm from "@/forms/TailorLoginForm";
import UserLoginForm from "@/forms/UserLoginForm";
import React from "react";

function TailorLoginPage() {
  return (
    <Layout>
      {/* HERO SECTION */}

      <section className="w-full text-center mb-72">
        <HeadingAndSubtext
          heading="Log in as tailor"
          subtext="Sign in to your account."
        />
        {/* CONTACT US FORM */}
        <div className="mt-16">
          <TailorLoginForm />
        </div>
      </section>

      <div></div>

      {/* FOOTER */}
      {/* <Footer /> */}
    </Layout>
  );
}

export default TailorLoginPage;
