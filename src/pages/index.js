import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Layout from "@/components/Layout";
import shirt from "../../public/images/shirt2.jpg";
import { Fade } from "react-reveal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div id="homeoverall">
      <div className="empty" />
      <div className="">
        <Layout>
          <div className="main -mt-32 py-44">
            <div>
              <Fade duration={1000} delay={100}>
                <Image
                  className="home-img object-contain my-auto"
                  src={shirt}
                  alt=""
                />
              </Fade>
            </div>
            <div className="about -mt-24">
              <Fade up duration={1000} delay={100}>
                <div className="cloth-description">
                  Finding Your Perfect Clothes
                </div>
              </Fade>
              <Fade up duration={1000} delay={200}>
                <div className="sub-description my-6">
                  Finding the perfect cloth that suits you can a herculean task.
                  Although, we have gone the extra mile to bring our best
                  considerations to you. So sit back and enjoy the experience!
                </div>
              </Fade>
              <div>
                <Link href="login.html">
                  <button className="shop-button">SHOP NOW</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="bottom-content">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <i className="fa-solid fa-truck-fast bottom-icon" />
                    </td>
                    <td>SPEEDY DELIVERY</td>
                  </tr>
                  <tr>
                    <td />
                    <td className="description">
                      With lightning fast delivery from out logistics, you will
                      get your succesfully bought clothes at your doorstep.
                      There is also a refund policy incase you didn't get what
                      was ordered
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bottom-content">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <i className="fa-solid fa-rotate bottom-icon" />
                    </td>
                    <td>USER CATEGORY</td>
                  </tr>
                  <tr>
                    <td />
                    <td className="description">
                      Users can swith between the two categories of either
                      tailor or customers. They can showcase and carry our
                      business transactions effectively.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bottom-content">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <i className="fa-solid fa-circle-question bottom-icon" />
                    </td>
                    <td>CUSTOMER SERVICE</td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      With a 24/7 help desk, we are always ready to answer your
                      questions and help you enjoy the full benefit of this
                      website. Any problem? Let us know, and we will be right
                      with you
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      </div>
      <div className="empty" />
    </div>
  );
}
