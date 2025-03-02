
import React, { useRef } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import * as styles from "@styles/slider.module.scss";




const ImagesSlider = ({ slides }) => {

    const [currentSlide, setCurrentSlide] = React.useState(0);
    const sliderRef = useRef(null);

    const next = () => {
        if (sliderRef.current) sliderRef.current.slickNext();
    };
    const prev = () => {
        if (sliderRef.current) sliderRef.current.slickPrev();
    };

    const sliderSettings = {
        dots: true,
        arrows: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        beforeChange: (prev, next) => setCurrentSlide(next),
        appendDots: dots => (
            <div
                style={{
                    position: "absolute",
                    bottom: "18px",
                    left: "18px",
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "flex-start"
                }}
            >
                <ul style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                    padding: "0",
                    margin: "0",
                    listStyle: "none"
                }}>
                    {dots.map((dot, index) => (
                        <li key={index} style={{
                            display: "inline-block",
                            padding:"0px",
                            margin:"0px"
                        }}>
                            <button
                                style={{
                                    height: "15px",
                                    width: "15px",
                                    borderRadius: "50%",
                                    border: "1px solid white",
                                    background: index === currentSlide ? "white" : "transparent",
                                    cursor: "pointer"
                                }}
                                onClick={() => sliderRef.current?.slickGoTo(index)} // Navigate to the slide
                            />
                        </li>
                    ))}
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
        <div className={styles.sliderSection}>
            <Slider {...sliderSettings} className={styles.sliderContainer} ref={sliderRef}>
                {slides?.map((el, i) => (
                    <div className={styles.slide} key={i}>
                        <GatsbyImage image={getImage(el)} alt={"slide " + (i + 1)} className={styles.image} />
                    </div>
                ))}
            </Slider>
            {/* Custom Arrows Container */}
            <div className={styles.arrowsContainer}>
                <button className={styles.prevArrow} onClick={prev} aria-label="previous slide">
                    <svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 2L2 13.5L15 25" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round" />
                    </svg>
                </button>
                <button className={styles.nextArrow} onClick={next} aria-label="next slide">
                    <svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 25L15 13.5L2 2" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ImagesSlider;