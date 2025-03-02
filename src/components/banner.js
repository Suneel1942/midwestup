import React from "react"
import Slider from "react-slick";
import { Image } from "@components/Image"

import "slick-carousel/slick/slick.css";
import * as styles from "@styles/banner.module.scss"

export default function Banner(props) {
  const { slides, media, children, classnames } = props
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
  };
  return (
    <section className={`${styles.banner} ${classnames}`} {...props}>
      {slides && (
        <Slider {...settings} className={styles.slideContainer}>
          {slides.map((slide, index) => (
            <div key={index}>
              <Image src={slide} alt={"Image " + index} className={styles.slideImage} />
            </div>
          ))}
        </Slider>
      )}
      {media && <Image src={media} alt="banner background image" className={styles.bannerImage} />}
      <div className={styles.bannerOverlay} />
      <div className={styles.textContainer}>
        {children}
      </div>
    </section>
  )
}
