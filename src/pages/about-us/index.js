import HeadingAndSubtext from "@/components/HeadingAndSubtext";
import Layout from "@/components/Layout";
import SignUpForm from "@/forms/SignUpForm";
import React from "react";

function AboutUsPage() {
  return (
    <Layout>
      {/* HERO SECTION */}

      <section className="w-full -mt-10 text-center mb-72">
        <HeadingAndSubtext
          heading="Register as user"
          subtext="Create an account today."
        />
        {/* SIGN UP FORM */}
        <div className="">
          <SignUpForm />
        </div>
      </section>

      <div></div>

      {/* FOOTER */}
      {/* <Footer /> */}
    </Layout>
  );
}

export default AboutUsPage;
