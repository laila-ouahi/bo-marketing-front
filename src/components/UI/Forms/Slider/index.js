import React from "react";
import styled from "styled-components";
import { Form, Icon } from "antd";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default ({ length, children }) => {
  const getSetting = code => {
    return length >= code
      ? {
          slidesToShow: code,
          slidesToScroll: code,
          infinite: true
        }
      : {
          slidesToShow: length,
          slidesToScroll: length
        };
  };

  const settings = {
    nextArrow: <Icon type="close" />,
    prevArrow: <Icon type="prev" />,
    dots: true,
    ...getSetting(4),
    speed: 500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          dots: true,
          ...getSetting(3)
        }
      },
      {
        breakpoint: 900,
        settings: {
          dots: true,
          ...getSetting(2)
        }
      },
      {
        breakpoint: 480,
        settings: {
          ...getSetting(1)
        }
      }
    ]
  };

  return (
    <StyledSlider length={length}>
      <Slider {...settings}>{children}</Slider>
    </StyledSlider>
  );
};

const StyledSlider = styled(props => <Form.Item {...props} />)`
  .slick-list {
    //background-color: #f7f7f7; //white; //#eee;
    //border-radius: 10px;
    text-align: center;
    overflow: hidden;
    //width: 65vw;
    //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    @media (max-width: 2000px) {
      width: 61vw;
    }
    @media (max-width: 1440px) {
      width: 56vw;
    }
    @media (max-width: 1200px) {
      width: 53vw;
    }
    @media (max-width: 1024px) {
      width: 50vw;
    }
    @media (max-width: 768px) {
      width: 50vw;
    }
    @media (max-width: 500px) {
      width: 40vw;
    }
    @media (max-width: 375px) {
      width: 37vw;
    }
  }
`;
