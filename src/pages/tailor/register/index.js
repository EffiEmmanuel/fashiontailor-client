import HeadingAndSubtext from "@/components/HeadingAndSubtext";
import Layout from "@/components/Layout";
import SignUpForm from "@/forms/SignUpForm";
import TailorSignUpForm from "@/forms/TailorSignUpForm";
import React from "react";

function TailorRegisterPage() {
  return (
    <Layout>
      {/* HERO SECTION */}

      <section className="w-full -mt-10 text-center mb-72">
        <HeadingAndSubtext
          heading="Register as a tailor"
          subtext="Create an account today."
        />
        {/* SIGN UP FORM */}
        <div className="">
          <TailorSignUpForm />
        </div>
      </section>

      <div></div>

      {/* FOOTER */}
      {/* <Footer /> */}
    </Layout>
  );
}

export default TailorRegisterPage;
