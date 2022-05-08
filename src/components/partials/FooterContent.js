import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { images } from "./_resources";

function FooterContent() {
  return (
    <FooterStyled
      style={{
        textAlign: "center",
        backgroundColor: "transparent",
        
      }}
    >
      &copy; {images.iconMoroccoFlag && <img src={images.logo} alt={"CDM"} />}
      {" 2022 Crédit du Maroc "}
    </FooterStyled>
  );
}

const FooterStyled = styled(props => <Layout.Footer {...props} />)`
  font-size: 13px;
  img {
    max-width: 100%;
    height: 13px;
  }
  @media (max-width: 1024px) {
    font-size: 12px;
    img {
      height: 12px;
    }
  }
  @media (max-width: 768px) {
    font-size: 11px;
    img {
      height: 11px;
    }
  }
  @media (max-width: 375px) {
    font-size: 10px;
    img {
      height: 10px;
    }
  }
`;

export default FooterContent;
