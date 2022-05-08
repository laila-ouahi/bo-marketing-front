import React, { useState } from "react";
import styled from "styled-components";

import Menu from "./Menu";
import { Logo } from "./Logo";
import { images } from "./_resources";

export default () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleCloseMenu = e => {
    setCollapsed(true);
  };

  return (
    <SideBar className={collapsed && "collapsed"}>
      <div className="topHeader">
        <div className="menu" onClick={() => toggleCollapsed()}>
          <img src={images.iconMenu} alt="Menu" />
        </div>
        <Logo />
      </div>
      <Menu collapsed={collapsed} handleCloseMenu={handleCloseMenu} />
    </SideBar>
  );
};

const SideBar = styled.div`
  box-shadow: 4px 0 7px -4px rgba(0, 0, 0, 0.1);
  min-height: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  &.collapsed {
    width: 80px;
    .topHeader {
      padding: 0;
      .menu {
        position: absolute;
        right: -50px;
        //changement
        @media (max-width: 768px) {
          right: -40px;
        }
        top: calc(50% - 10px);
      }
    }
  }
  .topHeader {
    text-align: center;
    height: 70px;
    border-bottom: solid 1px #f3f3f3;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 19px;
    position: relative;
    .menu {
      float: left;
      width: 24px;
      img {
        max-width: 24px;
      }
    }
  }
`;
