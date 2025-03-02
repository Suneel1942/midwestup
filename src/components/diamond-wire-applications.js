import React from "react";
import { Image } from "@components/Image";
import Slider from "react-slick";

import * as styles from "@styles/materials.module.scss";

const PrevArrow = (props) => (
  <button className={`${props.className} ${styles.prevArrow}`} disabled={props.disabled} style={{ ...props.style, background: "none", border: "none", cursor: "pointer", ...props.styles }} onClick={props.onClick} aria-label="previous slide" id={props.id}>
    <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2.19922L1 15.7989L18 29.3987" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
  </button>
);

const NextArrow = (props) => (
  <button className={`${props.className} ${styles.nextArrow}`} disabled={props.disabled} style={{ ...props.style, background: "none", border: "none", cursor: "pointer", ...props.styles }} onClick={props.onClick} aria-label="next slide" id={props.id}>
    <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 29.1992L19 15.5995L2 1.99977" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
  </button>
);

export const DiamondWireApplications = ({ data }) => {
  let sliderRef = React.useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const prev = () => {
    sliderRef.slickPrev();
  };
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const sliderSettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (prev,next) => setCurrentSlide(next),
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          bottom: "31px",
          left: "27px",
          height: "fit-content",
          width: "fit-content"
        }}
      >
        <ul style={{
          display: "flex",
          gap: "10px"
        }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          height: "15px",
          width: "15px",
          borderRadius: "100%",
          border: "1px solid white",
          background: i === currentSlide ? "white" : "transparent",
          cursor: "pointer"
        }}
      />
    )
  };
  return (
    <section className={`custom-section-layout ${styles.diamondWireApplicationsSection}`}>
      <div className="columns-container">
        <div className="left-column">
          <h2 className="section-column-title">{data?.heading}</h2>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.sourceText}>Source: CRISIL Report</p>
        <div className={styles.sliderOuterContainer}>
          <Slider {...sliderSettings} className={styles.slideContainer} ref={slider => { sliderRef = slider }}>
            {data?.slides?.map((el, i) => (
              <div className={styles.slide} key={i}>
                <Image src={el} alt={"slide " + i+1} className={styles.image} />
              </div>
            ))}
          </Slider>
          <div className={styles.buttonsContainer}>
            <button onClick={prev}>
            <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2.19922L1 15.7989L18 29.3987" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
            </button>
            <button onClick={next}>
            <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 29.1992L19 15.5995L2 1.99977" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
            </button>
          </div>
        </div>
        <ul className={styles.list}>
          {data?.items?.map((el, i) => (
            el.text_array ? (
              <li key={i} style={{ listStyleType: "none" }}>
                <ul>
                  {el.text_array.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
              </li>
            ) : <li key={i}>{el.text}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
