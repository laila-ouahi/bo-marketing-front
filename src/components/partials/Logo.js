import React from "react";
import styled from "styled-components";
import { images } from "../partials/_resources";

export const Logo = () => (
  <LogoStyled>
    <img src={images.logo} alt="" />
  </LogoStyled>
);

export const LogoStyled = styled.div`
  height: 59px;
  margin-right: 30%;
  padding: 5px;
  img {
    max-width: 100%;
    height: 50px;
  }
`;
