import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default ({ subPage, items, handleProps }) => {
  console.log("items", items);
  const [page, setPage] = useState(null);
  const handleSwitchPage = type => {
    if (type) {
      handleProps && handleProps(type);
      setPage(type);
    }
  };

  useEffect(() => {
    const data =
      items &&
      items.length > 0 &&
      items.filter(element => element !== undefined);
    console.log("data", data);
    setPage(data[0].val);
  }, []);

  useEffect(() => {
    subPage && setPage(subPage) && handleProps && handleProps(subPage);
  }, [subPage]);

  return (
    <Breadcrumbs>
      {items &&
        items.map(
          (item, index) =>
            item &&
            (item.path ? (
              <NavLink key={index} to={item.path} className={item.className}>
                {item.name}
              </NavLink>
            ) : (
              <a
                href
                className={`${item.val === page ? "active" : ""} ${item.class}`}
                onClick={() => handleSwitchPage(item.val)}
                key={index}
              >
                {item.name}
              </a>
            ))
        )}
    </Breadcrumbs>
  );
};

const Breadcrumbs = styled.div`
  max-width: 80vw;
  height: 50px;
  border-radius: 9px;
  padding: 0;
  box-shadow: 0 8px 16px 0 #e0e2e4;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  overflow: hidden;
  font-size: 14px;
  @media (max-width: 1440px) {
    font-size: 12px;
    font-weight: 500;
  }
  @media (max-width: 1024px) {
    font-size: 10px;
    font-weight: 400;
  }
  @media (max-width: 768px) {
    font-size: 10px;
    font-weight: 400;
  }
  @media (max-width: 375px) {
    font-size: 9px;
    font-weight: 300;
  }
  a {
    flex: 1;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #08676a;
    border-right: 1px solid #e6e6e6;
    line-height: 50px;
    position: relative;
    text-transform: uppercase;
    &.errors {
      background: #ee152c;
      color: #fff;
      font
    }
    &.hidden {
      display: none;
    }
    &:last-child {
      border-right: none;
    }
    &.active {
      border-bottom: 2px solid transparent;
      &:before {
        content: "";
        position: absolute;
        background: linear-gradient(to right, #00c6c9, #009498);
        left: 0;
        right: 0;
        bottom: -2px;
        height: 2px;
        border-radius: 3px;
      }
      &:after {
        content: "";
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 5px solid #009699;
        position: absolute;
        bottom: -7px;
        left: calc(50% - 8px);
      }
    }
  }
`;
