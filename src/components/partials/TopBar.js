import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon, Layout, Dropdown, Tooltip } from "antd";
import styled from "styled-components";
import { images } from "./_resources";
import withRouter from "react-router-dom/withRouter";
import { Logo } from "./Logo";
import { useKeycloak } from '@react-keycloak/web';

const TopBar = ({ history }) => {
  const { keycloak, initialized } = useKeycloak()
  const dropdown = () => {
    return (
      <Menu>
        <Menu.Item key="1">
          <NavLink onClick={keycloak.logout} to={"/"}>
            <Icon type="logout" /> Déconnexion
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <HeaderStyled>
      <div className="headerRight">
        <Logo />
        <NavLink to={"/"} className="nav-link">Envoi de notifications</NavLink>
        <NavLink to={"/subscription"} className="nav-link">Souscriptions clients</NavLink>
        <Dropdown overlay={dropdown} trigger={["click"]}>
          <a className="ant-dropdown-link" href={"/"}>
            <h6>
              <span>user</span>

              <img src={images.iconMenu} alt="" />
            </h6>
          </a>
        </Dropdown>
      </div>
    </HeaderStyled>
  );
};

export default withRouter(TopBar);

const HeaderStyled = styled((props) => <Layout.Header {...props} />)`
  height: 70px;
  box-shadow: 0 4px 7px -4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-bottom: 1px solid #009498;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9;
  padding: 0 12px;
  .headerRight {
    display: flex;
    flex:1;

    flex-wrap: warp;
    
  justify-content: space-between;
    height: 69px;
    .notifications,
    .search {
      width: 70px;
      @media (max-width: 768px) {
        width: 40px;
      }
      @media (max-width: 375px) {
        width: 30px;
      }

      i {
        color: rgba(100, 102, 120, 0.4);
        font-size: 25px;
      }

      border-left: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        width: 20px;
        height: 20px;
        background-color: #3591fb;
        border-radius: 26px;
        font-size: 13px;
        font-weight: bold;
        color: #fff;
        display: inline-block;
        line-height: 20px;
        margin-left: -15px;
        margin-top: -19px;
        position: relative;
        z-index: 99;
      }
      img {
        max-width: 25px;
      }
    }
    .search {
      @media (max-width: 768px) {
        display: none;
      }
    }

    .ant-dropdown-link {
      padding: 2px 0 2px 50px;
      @media (max-width: 1440px) {
        padding: 2px 40px 2px 40px;
      }
      @media (max-width: 1024px) {
        padding: 2px 30px 2px 30px;
      }
      @media (max-width: 768px) {
        padding: 2px 20px 2px 20px;
      }
      @media (max-width: 375px) {
        padding: 2px 10px 2px 10px;
      }

      h6 {
        margin: 0;
        display: inline-block;
        font-size: 13px;
        @media (max-width: 768px) {
          font-size: 11px;
        }
        @media (max-width: 375px) {
          font-size: 10px;
        }

        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: right;
        border-radius: 50px;
        span {
          color: #000000;
          float: left;
          margin-top: 8px;
          @media (max-width: 768px) {
            margin-top: 2px;
          }
        }
        b {
          color: #006d4f;
          text-transform: uppercase;
        }
        img {
          height: auto;
          border-radius: 50px;
          border: solid 2px #009498;

          margin: 0 15px 0 20px;
          width: 45px;
          min-width: 45px;
          min-height: 45px;
          @media (max-width: 768px) {
            margin: 0 12px 0 15px;
            width: 35px;
            min-width: 30px;
            min-height: 35px;
          }
          @media (max-width: 375px) {
            margin: 0 8px 0 11px;
            width: 30px;
            min-width: 30px;
            min-height: 30px;
          }
        }
      }
      i {
        color: #606060;
      }
    }
  }
`;
