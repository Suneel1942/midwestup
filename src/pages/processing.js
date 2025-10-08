import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import Seo from "@components/seo"
import Banner from "@components/banner"
import { Image } from "@components/Image"
import { ImageSvg } from "@components/imageSvg"
import { SliderComponent } from "@components/slider"
import { useWindowSize } from "@utils/useWindowSize"
import ImagesSlider from "../components/ImagesSlider"

import * as styles from "@styles/processing.module.scss"

const ProcessingPage = ({ data }) => {
  const { banner, description, sub_tabs } = data.processing

  const [tab, setTab] = useState(0)

  const { width } = useWindowSize()
  const [isMobile, setMobile] = useState(width < 1025)
  const [isMobileTablet, setMobileTable] = useState(width < 1025)

  useEffect(() => {
    function resize() {
      setMobile(width < 1025)
      setMobileTable(width < 1025)
    }
    resize()
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [width])

  const subTabs = sub_tabs?.filter(el => el.title !== "Heavy Mineral Sands Processing")

  return (
    <Layout>
      <Banner media={banner.background} classnames={styles.customBanner}>
        <h1>{banner.title}</h1>
      </Banner>
      <section className={`custom-section-layout ${styles.descriptionSection}`}>
        <ImageSvg src="backgrounds/gray.svg" alt="" className={styles.background} />
        <div className="columns-container" style={{ marginTop: "0" }}>
          <div className="left-column">
            <h2 className="section-column-title">{description?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">{description?.right_column?.text}</p>
          </div>
        </div>
      </section>
      <div className={styles.subtabsContainer}>
        {!isMobile && (
          <ul style={{ gridTemplateColumns: `repeat(${subTabs?.length}, minmax(0, 1fr))` }}>
            {subTabs?.map((el, index) => (
              <li
                key={index}
                role="button"
                onClick={() => setTab(index)}
                className={tab === index ? styles.active : ``}
              >
                <p>{el.title}</p>
              </li>
            ))}
          </ul>
        )}
        {isMobile && (
          <SliderComponent
            slides={subTabs}
            options={{
              slidesToShow: 2,
              slidesToScroll: 2,
            }}
            className={`processing-tabs-slider ${styles.tabSlider}`}
            slideClassName={styles.slideWrapper}
          >
            {({ data }) => (
              <div
                className={`${styles.slide} ${data.index === tab ? styles.active : ""}`}
                role="button"
                onClick={() => setTab(data.index)}
              >
                <p>{data.title}</p>
              </div>
            )}
          </SliderComponent>
        )}
      </div>
      <section
        className={`custom-section-layout ${styles.infrastructureSection}`}
        style={
          subTabs[tab]?.title === "Heavy Mineral Sands Processing"
            ? {
                color: "white",
                height: "calc(100vh - 116px)",
              }
            : { paddingBottom: isMobile && subTabs[tab]?.content?.infrastructure?.image ? 0 : "" }
        }
      >
        <div className="columns-container !mb-6">
          <div className="left-column">
            <h2 className="section-column-title">
              {subTabs[tab]?.content?.infrastructure?.left_column?.title}
            </h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {subTabs[tab]?.content?.infrastructure?.right_column?.description}
            </p>
          </div>
        </div>
        {subTabs[tab]?.content?.infrastructure?.image && (
          <>
            <Image
              src={
                isMobile
                  ? subTabs[tab]?.content?.infrastructure?.image_mobile
                  : subTabs[tab]?.content?.infrastructure?.image
              }
              alt=""
              className={
                subTabs[tab]?.title === "Heavy Mineral Sands Processing"
                  ? styles.imageAbsolute
                  : styles.image
              }
            />
            {subTabs[tab]?.title === "Heavy Mineral Sands Processing" && (
              <div className={styles.overlay} />
            )}
          </>
        )}
      </section>
      {subTabs[tab]?.content?.innovation && (
        <section
          className={`custom-section-layout ${styles.innovationSection}`}
          style={
            subTabs[tab]?.title === "Natural Stone Processing" && isMobileTablet
              ? { height: "auto", paddingBottom: 0 }
              : {}
          }
        >
          <div
            style={
              subTabs[tab]?.title === "Natural Stone Processing" && isMobile
                ? { order: 2, marginTop: "17px" }
                : {}
            }
          >
            <Image
              src={
                isMobile
                  ? subTabs[tab]?.content?.innovation?.image_mobile
                  : subTabs[tab]?.content?.innovation?.image
              }
              alt=""
              className={
                subTabs[tab]?.title === "Natural Stone Processing" && isMobile
                  ? styles.imageBlock
                  : styles.image
              }
            />
            <div
              className={styles.overlay}
              style={
                subTabs[tab]?.title === "Natural Stone Processing" && isMobile
                  ? { display: "none" }
                  : {}
              }
            />
          </div>
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">
                {subTabs[tab]?.content?.innovation?.left_column?.title}
              </h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">
                {subTabs[tab]?.content?.innovation?.right_column?.description}
              </p>
            </div>
          </div>
        </section>
      )}
      <section className={`custom-section-layout ${styles.capacitySection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{subTabs[tab]?.content?.capacity?.heading}</h2>
          </div>
          <div className={`right-column ${styles.rightColumn}`}>
            <ul
              className={
                subTabs[tab]?.content?.capacity?.list_columns === 2 ? styles.twoColumns : ""
              }
            >
              {subTabs[tab]?.content?.capacity?.list?.map((el, i) => (
                <li key={i}>
                  <ImageSvg src={el.background} alt="" className={styles.background} />
                  <div>
                    <h4>{el.title}</h4>
                    <p>{el.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {subTabs[tab]?.content?.sustainability && (
        <section className={`custom-section-layout ${styles.sustainabilitySection}`}>
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">
                {subTabs[tab]?.content?.sustainability?.left_column?.title}
              </h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">
                {subTabs[tab]?.content?.sustainability?.right_column?.description}
              </p>
            </div>
          </div>
        </section>
      )}
      {subTabs[tab]?.title === "Diamond Wire Tool Processing" && (
        <>
          <section className={`custom-section-layout ${styles.diamondWireProcessSection}`}>
            <div className="columns-container">
              <div className="left-column">
                <h2 className="section-column-title">
                  {subTabs[tab]?.content?.process?.left_column?.title}
                </h2>
              </div>
              <div className="right-column">
                <p className="section-column-description">
                  {subTabs[tab]?.content?.process?.right_column?.description}
                </p>
              </div>
            </div>
            <ul>
              {subTabs[tab]?.content?.process?.list?.map((el, i) => (
                <li key={i}>
                  <ImageSvg src={el.background} alt="" className={styles.background} />
                  <p>{el.title}</p>
                </li>
              ))}
            </ul>
            <div className={`columns-container ${styles.imageContainer}`}>
              <div className="left-column"></div>
              <div className="right-column">
                {subTabs[tab]?.content?.process?.imageslist && (
                  <ImagesSlider slides={subTabs[tab]?.content?.process?.imageslist} />
                )}
                {/* <Image src={subTabs[tab]?.content?.process?.image} alt="" className={styles.image} /> */}
              </div>
            </div>
          </section>
          <section className={`custom-section-layout ${styles.diamondWireHighlightsSection}`}>
            <div className="columns-container">
              <div className="left-column">
                <h2 className="section-column-title">
                  {subTabs[tab]?.content?.highlights?.heading}
                </h2>
              </div>
              <div className="right-column">
                <ul className={styles.cardsContainer}>
                  {subTabs[tab]?.content?.highlights?.list?.map((el, i) => (
                    <li key={i}>
                      <ImageSvg src={el.background} alt="" className={styles.background} />
                      <h4>{el.title}</h4>
                      <p>{el.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className={`custom-section-layout`}>
            <div className="columns-container">
              <div className="left-column">
                <h2 className="section-column-title">
                  {subTabs[tab]?.content?.marketing?.left_column?.title}
                </h2>
              </div>
              <div className="right-column">
                <p className="section-column-description">
                  {subTabs[tab]?.content?.marketing?.right_column?.description}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
      {/* <BackToTop /> */}
    </Layout>
  )
}

export const Head = () => <Seo title="Processing" />

export const processingPageQuery = graphql`
  query content {
    processing: processingJson {
      banner {
        title
        background
      }
      description {
        left_column {
          title
        }
        right_column {
          text
        }
      }
      sub_tabs {
        title
        content {
          infrastructure {
            left_column {
              title
            }
            right_column {
              description
            }
            image
            image_mobile
          }
          innovation {
            image
            image_mobile
            left_column {
              title
            }
            right_column {
              description
            }
          }
          capacity {
            heading
            list_columns
            list {
              title
              description
              background
            }
          }
          sustainability {
            left_column {
              title
            }
            right_column {
              description
            }
          }
          process {
            left_column {
              title
            }
            right_column {
              description
            }
            list {
              title
              background
            }
            image
            imageslist {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 900)
              }
            }
          }
          highlights {
            heading
            list {
              title
              description
              background
            }
          }
          marketing {
            left_column {
              title
            }
            right_column {
              description
            }
          }
        }
      }
    }
  }
`

export default ProcessingPage
