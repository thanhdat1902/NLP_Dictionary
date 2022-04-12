import React from "react"
import { FooterContainer } from "./styled";
const Footer = () => {
  return (
    <FooterContainer>
      <p className = "first">Paracor Website</p>
      <div className = "part1">
        <div className = "left">
          <h5>Contact</h5>
        </div>
        <div className="middle">
          <h5>About Us</h5>
        </div>
        <div className="right">
          <h5>Partner</h5>
        </div>
      </div>
      <p className="second"> Copyright(C)
        <a href="http://www.clc.hcmus.edu.vn/" > CLC </a>
        2020 Version 0.1.
      </p>

    </FooterContainer>
  )
}

export default Footer;
