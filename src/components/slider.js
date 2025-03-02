import React from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

export function SliderComponent(props) {
  const { slides, options, slideClassName, children } = props
  const settings = {
    dots: false,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    ...options
  }
  return (
    <Slider {...settings} {...props}>
      {slides?.map((slide, index) => (
        <div key={index} className={slideClassName}>
          {children({ data: { index: index, ...slide } })}
        </div>
      ))}
    </Slider>
  )
}

export function SimpleSlider({ children, options, ...props}) {
  // const { slides, options, slideClassName, children } = props
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    ...options
  }
  return (
    <Slider {...settings} {...props}>
      {children}
    </Slider>
  )
}

export const PrevArrow = (props) => (
  <button className={props.className} disabled={props.disabled} style={{ ...props.style, background: "none", border: "none", cursor: "pointer", ...props.styles }} onClick={props.onClick} aria-label="previous slide" id={props.id}>
    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2.28607L1 16.0195L18 29.7529" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
  </button>
);
export const NextArrow = (props) => (
  <button className={props.className} disabled={props.disabled} style={{ ...props.style, background: "none", border: "none", cursor: "pointer", ...props.styles }} onClick={props.onClick} aria-label="next slide" id={props.id}>
    <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 29.7529L19 16.0195L2 2.28606" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
  </button>
);
