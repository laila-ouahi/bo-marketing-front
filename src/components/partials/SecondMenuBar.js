import React, { useState, useEffect } from "react";
import { Icon, Tooltip } from "antd";
import { isValidFiled } from "../../utils/utility";
import Modale from "../UI/Modale";
import * as Global from "../../constants/resources/Global";
import styled from "styled-components";

import { images } from "./_resources";

export default ({
  onglets,
  title,
  page,
  setPages,
  setSubPages,
  props,
  goBackVerification,
  history,
  onClick
}) => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [collapsed, setCollapsed] = useState(window.innerWidth <= "768");

  const handleChangeWidth = () => {
    setCollapsed(window.innerWidth <= "768");
  };

  useEffect(() => {
    window.addEventListener("resize", handleChangeWidth);
    return () => window.removeEventListener("resize", handleChangeWidth);
  });

  const handleSwitchPage = type => {
    setPages && setPages(type);
    setSubPages && setSubPages(null);
  };

  const handleGoBack = () => {
    onClick
      ? onClick()
      : history
      ? history.goBack()
      : props && props.history && props.history.goBack();
  };

  const handleOpenModal = () => {
    setShowVerificationModal(true);
  };

  const handleCloseModal = () => {
    setShowVerificationModal(false);
  };
  let backClass = "standard";
  if (collapsed) {
    backClass = "spec";
  }

  return (
    <StyledSecondMenuBar onglets={onglets} collapsed={collapsed} id="sideBar">
      <div>
        <Tooltip title="Retour" placement="top">
          <StyledLink
            className={backClass}
            href
            onClick={() =>
              goBackVerification ? handleOpenModal() : handleGoBack()
            }
          >
            <Icon type="arrow-left" />
          </StyledLink>
        </Tooltip>
        {title && !collapsed ? <h1>{title}</h1> : <br />}
        <Modale
          title={Global.title.goBackTitle}
          visible={showVerificationModal}
          onOk={() => handleGoBack()}
          onCancel={handleCloseModal}
          text={Global.Messages.goBackVerification}
        />
        <ul>
          {isValidFiled(onglets) &&
            onglets.map((onglet, index) => (
              <li key={index}>
                <a
                  href
                  className={onglet.val === page ? "active" : "inactive"}
                  onClick={() => handleSwitchPage(onglet.val)}
                  title={collapsed ? onglet.name : ""}
                >
                  {collapsed && (
                    <Tooltip title={onglet.name} placement="right">
                      <img
                        src={onglet.icon || images.iconTodoList}
                        alt={onglet.name}
                      />
                    </Tooltip>
                  )}
                  {!collapsed && <span>{onglet.name}</span>}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </StyledSecondMenuBar>
  );
};

const StyledLink = styled.a`
  font-size: 25px;
  @media (max-width: 768px) {
    font-size: 20px;
    background-color: black;
    opacity: 0.8;
    color: white;
    border-radius: 50%;
    padding: 4px 6px 4px;
  }
`;

const StyledSecondMenuBar = styled.div`
background : ${({ onglets }) => (isValidFiled(onglets) ? "#F0F4F7" : "none")};
position: fixed;
top: 70px;
bottom: 0;
left: 80px;
z-index: 9;
padding: 10px 10px 20px 10px;
overflow-y: auto;
width: 220px;
max-width: fit-content;
h1{ 
  font-weight: bold;
}
@media (max-width: 1440px){
  width: 220px;
  font-size: 13px;
}
@media (max-width: 1024px){
  width: 160px;
  font-size: 10px;
}
@media (max-width: 768px){
  width: 70px;
  font-size: 10px;
}
@media (max-width: 375px){
  width: 70px;
  font-size: 10px;
}
.standard{
  margin-left: 3%;
}
ul {
  margin: 0;
  padding: 0;
  @media (max-width: 768px){
    margin-right: 10px !important;
  }
  li {
    border-bottom: none;
    list-style-type: none;
    font-weight: bold;
    cursor: pointer;
    a {
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.65);
      float: left;
      width: 100%;
      @media (max-width: 768px){
        width: auto;
      }
      ${({ collapsed }) =>
        collapsed ? "padding-left: 18px" : "padding-left: 1px"};
      height: 50px;
      line-height: 50px;
      border-bottom-right-radius: 13px;
      border-top-right-radius: 13px;
      &.active {
        background: #00979a;
        color: #fff;
      }
    }
    img {
      margin-left: -15px;
      min-width: 30px;
    }
  }
`;
