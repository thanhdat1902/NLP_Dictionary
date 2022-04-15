import React from "react";
import Footer from "../../components/footer";

const AboutPage = (props) => {
  return (
    <div>
      <img src={require("../../assets/img/slide1.png")} alt="slide1" height="100%" width="100%"/>
      <img src={require("../../assets/img/slide2.png")} alt="slide2" height="100%" width="100%"/>
      <img src={require("../../assets/img/slide3.png")} alt="slide3" height="100%" width="100%"/>
      <Footer></Footer>
    </div>
  );
};

export default AboutPage;
