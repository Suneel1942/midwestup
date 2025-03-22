import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Image } from "@components/Image"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const images = [
    { title: "Nature 1", src: "https://c4.wallpaperflare.com/wallpaper/26/26/373/full-size-hd-nature-1920x1200-wallpaper-preview.jpg" },
    { title: "Nature 2", src: "https://i.pinimg.com/736x/bd/ec/18/bdec18142ac4eea6cf95e3cb29704e75.jpg" },
    { title: "Nature 3", src: "https://c4.wallpaperflare.com/wallpaper/306/512/867/nature-desktop-full-size-1920x1080-wallpaper-preview.jpg" },
    { title: "Nature 4", src: "https://c4.wallpaperflare.com/wallpaper/238/753/262/photo-nature-beauty-image-1920x1200-wallpaper-thumb.jpg" },
    { title: "Nature 5", src: "https://c4.wallpaperflare.com/wallpaper/71/397/257/nature-full-size-desktop-7680x4320-wallpaper-preview.jpg" },
    { title: "Nature 6", src: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-nature-scenery-free-image.jpeg?w=1000&quality=80" },
];

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ImageImg = styled.img`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.5s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0px 25px;
  width:100%;
`;

const ThumbnailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const Thumbnails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  overflow: hidden;
  width: 100%;
`;

const Thumbnail = styled.button`
  min-width:42%;
  padding:0.5rem !important;
  font-family: var(--font-montserrat);
  @media screen and (max-width:767px) {
    font-size:0.825rem;
  }
  font-size:1.125rem;
  background-color: ${({ active }) => (active ? "#91CB00;" : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "#c6c6c8")};
  border: ${({ active }) => (active ? "1px solid #91CB00" : "1px solid #bbbcbe")};
  opacity: ${({ active }) => (active ? "1" : "0.6")};

  // transition: opacity 0.3s ease-in-out;

  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin:0px 5px;
  height:fit-content;
`;

const Arrow = styled.button`
  background-color:transparent;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 1;
`;

const MarketGrowthMobileComponent = ({ list }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [thumbIndex, setThumbIndex] = useState(0);

    const updateIndex = (newIndex) => {
        setCurrentIndex(newIndex);
        setThumbIndex(Math.max(0, Math.min(newIndex, images.length - 2)));
    };

    const prevThumb = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        updateIndex(newIndex);
    };

    const nextThumb = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        updateIndex(newIndex);
    };

    return (
        <SliderContainer>
            <ThumbnailsContainer>
                <Arrow onClick={prevThumb}>
                    <svg width="30" height="30" viewBox="0 0 24 24">
                        <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                </Arrow>
                <ThumbnailsWrapper>
                    <Thumbnails>
                        {list.slice(thumbIndex, thumbIndex + 2).map((image, index) => (
                            <Thumbnail
                                key={thumbIndex + index}
                                active={thumbIndex + index === currentIndex}
                                onClick={() => updateIndex(thumbIndex + index)}
                            >
                                {image.title}
                            </Thumbnail>
                        ))}
                    </Thumbnails>
                </ThumbnailsWrapper>
                <Arrow onClick={nextThumb}>
                    <svg width="30" height="30" viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                </Arrow>
            </ThumbnailsContainer>
            <ImageContainer>
                <Image
                    src={list[currentIndex].image}
                    alt={list[currentIndex].title} key={currentIndex}
                />
                {/* <Image src={list[currentIndex].image} alt={list[currentIndex].title} key={currentIndex} /> */}
            </ImageContainer>

        </SliderContainer>
    );
};

export default MarketGrowthMobileComponent;
