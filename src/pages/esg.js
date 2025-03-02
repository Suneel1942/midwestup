import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import Layout from "@components/layout";
import SEO from "@components/seo";
import Banner from "@components/banner";
import { Image } from "@components/Image";
import { ImageSvg } from "@components/imageSvg";
import { useWindowSize } from "@utils/useWindowSize";
import ImagesSlider from "../components/ImagesSlider";

import * as styles from "@styles/esg.module.scss";
import "@styles/esg.scss";

const EsgPage = ({ data }) => {
  const {
    banner,
    about,
    value_business,
    commitment,
    pillars,
    principles,
    sections,
    committee,
    future
  } = data.esg;

  const { width } = useWindowSize()
  const [isMobile, setMobile] = useState(width < 640)

  useEffect(() => {
    function resize() {
      setMobile(width < 640)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  },[width])

  return (
    <Layout>
      <Banner
        media={isMobile ? banner.background_mobile : banner.background}
        classnames={styles.customBanner}
      >
        <h1>{banner.heading}</h1>
      </Banner>
      <section className={`custom-section-layout ${styles.aboutSection}`}>
        <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} />
        <Image src={about?.image} alt="" className={styles.image} />
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">
              {about?.left_column?.heading}
            </h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {about?.right_column?.description}
            </p>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.valueBusinessSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">
              {value_business?.left_column?.title}
            </h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {value_business?.right_column?.description}
            </p>
          </div>
        </div>
        <ul>
          {value_business?.list?.map((item, index) => (
            <li key={index}>
              <ImageSvg src={item.background} alt="" className={styles.background} />
              <h3>{item.heading}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={`custom-section-layout ${styles.commitmentSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <ImageSvg src={commitment.left_column?.icon} alt="leaf icon" className={`icon ${styles.icon}`} />
            <h2 className="section-column-title">
              {commitment?.left_column?.heading}
            </h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {commitment?.right_column?.description}
            </p>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.pillarsSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">
              {pillars?.heading}
            </h2>
          </div>
          <div className="right-column">
            <ul>
              {pillars?.list?.map((item, index) => (
                <li key={index}>
                  <ImageSvg src={item.background} alt="" className={styles.background} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.principlesSection}`}>
        <Image src={isMobile ? principles?.image_mobile : principles?.image} alt="" className={styles.image} />
        <span className={`header-text ${styles.header}`}>{principles.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">
              {principles?.left_column?.title}
            </h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {principles?.right_column?.description}
            </p>
          </div>
        </div>
      </section>
      {sections?.map((section,index) => (
        <section
          key={index}
          className={`custom-section-layout ${styles.sectionList} section-list-${section?.header?.toLowerCase()}`}
        >
          <span className="header-text">{section?.header}</span>
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">
                {section?.left_column?.title}
              </h2>
            </div>
            <div className={`right-column ${styles.rightColumn}`} style={{ maxWidth:"720px"}}>
              <p className="section-column-description">
                {section?.right_column?.description}
              </p>
              <ul>
                {section?.list?.map((item, index) => (
                  <li key={index}>
                    <ImageSvg src={item.background} alt="" className={styles.background} />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
              {/* {section?.image && <Image src={section?.image} alt="" className={`esg-section-img ${styles.image}`} />} */}
              {section?.imageslist && <ImagesSlider slides={section?.imageslist} />}
            </div>
          </div>
        </section>
      ))}
      <div className={styles.endSections}>
        <ImageSvg src="backgrounds/gray.svg" alt="" className={styles.background} />
        <section className={`custom-section-layout ${styles.committeeSection}`}>
          {/* <ImageSvg src="backgrounds/gray.svg" alt="" className={styles.background} /> */}
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">
                {committee?.left_column?.title}
              </h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">
                {committee?.right_column?.description}
              </p>
            </div>
          </div>
        </section>
        <section className={`custom-section-layout ${styles.futureSection}`}>
          {/* <ImageSvg src="backgrounds/gray.svg" alt="" className={styles.background} /> */}
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">
                {future?.left_column?.title}
              </h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">
                {future?.right_column?.description}
              </p>
              <p className={styles.contentText}>{future?.text}</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const Head = () => <SEO title="ESG" />;

export const EsgPageQuery = graphql`
  query content {
    esg: esgJson {
      banner {
        heading
        background
        background_mobile
      }
      about {
        image
        left_column {
          heading
        }
        right_column {
          description
        }
      }
      value_business {
        left_column {
          title
        }
        right_column {
          description
        }
        list {
          heading
          description
          background
        }
      }
      commitment {
        left_column {
          icon
          heading
        }
        right_column {
          description
        }
      }
      pillars {
        heading
        list {
          title
          description
          background
        }
      }
      principles {
        image
        image_mobile
        header
        left_column {
          title
        }
        right_column {
          description
        }
      }
      sections {
        header
        left_column {
          title
        }
        right_column {
          description
        }
        list {
          title
          description
          background
        }
        image
        imageslist {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 900)
            }
          }
      }
      committee {
        left_column {
          title
        }
        right_column {
          description
        }
      }
      future {
        left_column {
          title
        }
        right_column {
          description
        }
        text
      }
    }
  }
`

export default EsgPage;
