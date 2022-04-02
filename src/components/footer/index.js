import React from "react"
import { FooterContainer } from "./styled";
const Footer = () => {
  return (
    <FooterContainer>
      <p class = "first">Paracor Website</p>
      <div class = "part1">
        <div class = "left">
          <h5>Contact</h5>
        </div>
        <div class="middle">
          <h5>About Us</h5>
        </div>
        <div class="right">
          <h5>Partner</h5>
        </div>
      </div>
      <p class="second"> Copyright(C)
        <a href="http://www.clc.hcmus.edu.vn/" > CLC </a>
        2020 Version 0.1.
      </p>

    </FooterContainer>
  )
}

export default Footer;
