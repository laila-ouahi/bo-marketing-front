import React from "react"
import { Layout, BackTop } from "antd"
import PropTypes from "prop-types"
import styled from "styled-components"
import SideBar from "../components/partials/SideBar"
import TopBar from "../components/partials/TopBar"
import FooterContent from "../components/partials/FooterContent"

const ApplicationContainer = props => {
  const { children } = props;


  return (
    <Layout style={{ flexDirection: "row", minHeight: "100vh" }}>
      <Layout>
        <TopBar />
        <Layout.Content>
          <BackTop />
          <LayoutContent>
            {children}
          </LayoutContent>
        </Layout.Content>
        <BackTop />
        <FooterContent />
      </Layout>

    </Layout>
  );
};

ApplicationContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ApplicationContainer;

const LayoutContent = styled.div`
  padding: 24px;
  max-width: 80vw;
  min-height: 100%;
  //margin-top: 70px;
  //margin-left: 80px;
  margin: 70px auto 0;
  h1 {
    color: #00979a;
    margin-bottom: 20px;
  }
  @media (max-width: 1440px) {
    margin: 70px 0 0 120px;
    h1 {
      font-size: 20px;
      font-weight: 600;
    }
  }
  @media (max-width: 1024px) {
    margin: 70px 0 0 80px;
    h1 {
      font-size: 18px;
      font-weight: 500;
    }
  }
  @media (max-width: 768px) {
    margin: 70px 0 0 80px;
    h1 {
      font-size: 14px;
      font-weight: 400;
    }
  }
  @media (max-width: 375px) {
    margin: 70px 0 0 80px;
    h1 {
      font-size: 10px;
      font-weight: 300;
    }
  }
`;
