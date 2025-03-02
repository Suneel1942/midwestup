import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Banner from "@components/banner"
import { Image } from "@components/Image"
import { ImageSvg } from "@components/imageSvg"
import { Button } from "@components/button"
import { SliderComponent, NextArrow, PrevArrow } from "@components/slider"
import { withBoldText } from "@utils/withBoldText"
import { useWindowSize } from "@utils/useWindowSize"
// import BackToTop from "@components/back-to-top"
import Slider from "react-slick";

import { NaturalStoneProducts } from "@components/natural-stone-products"
import { NaturalStoneStrength } from "@components/natural-stone-strength"
import { NaturalStoneSustainability } from "@components/natural-stone-sustainability"
import { DiamondWireProducts } from "@components/diamond-wire-products"
import { DiamondWireApplications } from "@components/diamond-wire-applications"
import { DiamondWireFeatures } from "@components/diamond-wire-features"
import MarketGrowthComponent from "../components/MarketGrowthComponent"

import "slick-carousel/slick/slick.css";
import * as styles from "@styles/materials.module.scss"

const MaterialsPage = ({ data: { materialsJson } }) => {
  const {
    title,
    slug,
    banner,
    description,
    strength,
    market,
    marketgrowth,
    products,
    applications,
    projects,
    sustainability,
    features
  } = materialsJson

  console.log('marketgrowthmarketgrowth',marketgrowth)

  const [marketTab, setMarketTab] = useState(0)
  const [productTab, setProductTab] = useState(0)
  const [productButton, setProductButton] = useState("description")

  let productsList = [...products?.list] ?? [];
  while (productsList.length < 4) {
    productsList.push({
      title: "placeholder",
      image: "/placeholder.jpg",
      details: {
        description: "No description available.",
        applications: "No applications available."
      }
    })
  }
  const arrowDisabled = productsList.length < 5

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
  }, [width])

  const projectsSliderSettings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Layout>
      <SEO title={title} keywords={[title, `materials`, `products`, `Midwest Group`]} />
      {materialsJson ? (
        <>
          <Banner media={isMobile ? banner.background_mobile : banner.background}>
            {banner.heading.split("<br/>").map((el, i) => (
              <h1 key={i}>{el}</h1>
            ))}
          </Banner>
          <section className={`custom-section-layout ${styles.descriptionSection}`}>
            <div className={styles.sectionWrapper}>
              <div className="columns-container">
                <div className="left-column">
                  <ImageSvg src={description?.left_column?.icon} alt="story icon" className={`icon ${slug} ${styles.icon}`} />
                  <h2 className="section-column-title">{description?.left_column?.title}</h2>
                </div>
                <div className="right-column">
                  <p className="section-column-description">
                    {description?.right_column?.description?.type === "list" ? (
                      <ul className={styles.descriptionList}>
                        {description?.right_column?.description?.array?.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </ul>
                    ) : (
                      <>{description?.right_column?.description?.text}</>
                    )}
                    {/* {description?.right_column?.description} */}
                  </p>
                  <div className={styles.content}>
                    <ul className={(isMobile && description?.list_flow === "column") ? styles.grid : ""}>
                      {description?.list?.map((el, i) => (
                        <li key={i}>
                          <ImageSvg src={el.color} alt="" className={styles.background} />
                          <p>{withBoldText(el.text)}</p>
                        </li>
                      ))}
                    </ul>
                    {description?.source && (
                      <p className={styles.sourceText}>{description.source}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {description?.image && (
              <div className={`${slug==='diamond-wire-tools' || slug==='heavy-mineral-sands' ? styles.diamondImage : styles.imageContainer}`} >
              <Image
                src={isMobile ? description.image_mobile : description.image}
                alt={title + " image"}
                className={styles.image}
              />
              </div>
            )}
          </section>
          
          {slug === "natural-stone" && (
            <NaturalStoneStrength data={strength} isMobile={isMobile} />
          )}
          <section className={`custom-section-layout ${styles.marketSection}`}>
            {/* <ImageSvg src="backgrounds/gray.svg" alt="gray background" className={styles.background} /> */}
            <div className={styles.sectionWrapper}>
              <div className="columns-container">
                <div className="left-column">
                  <h2 className="section-column-title">{market?.title}</h2>
                  <div className={styles.buttonsContainer}>
                    {market?.content?.tabs?.map((el, i) => (
                      <Button
                        key={i}
                        text={el.title}
                        color="#91CB00"
                        active={marketTab === i}
                        onClick={() => setMarketTab(i)}
                      />
                    ))}
                  </div>
                </div>
                <div className={`right-column ${styles.rightColumn}`}>
                  <ul>
                    {market?.content?.tabs[marketTab]?.list?.map((el, i) => (
                      <li key={i}>{el}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          {marketgrowth && <MarketGrowthComponent data={marketgrowth} />}
          {slug === "natural-stone" && (
            <NaturalStoneProducts
              products={products}
              tab={productTab}
              setTab={setProductTab}
            />
          )}
          {slug === "diamond-wire-tools" && (
            <DiamondWireProducts products={products} />
          )}
          {(slug !== "natural-stone") && (slug !== "diamond-wire-tools") && (
            <section className={`custom-section-layout ${styles.productsSection}`}>
              <div className={styles.sectionWrapper}>
                <div className="columns-container">
                  <div className="left-column">
                    <h2 className="section-column-title">{products?.heading}</h2>
                  </div>
                </div>
              </div>
              <div className={styles.content}>
                <SliderComponent
                  slides={isMobile ? products?.list : productsList}
                  options={{
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    nextArrow: <NextArrow
                      disabled={!isMobile && arrowDisabled}
                      styles={(!isMobile && arrowDisabled) ? { cursor: "auto", opacity: 0 } : {}}
                    />,
                    prevArrow: <PrevArrow
                      disabled={!isMobile && arrowDisabled}
                      styles={(!isMobile && arrowDisabled) ? { cursor: "auto", opacity: 0 } : {}}
                    />,
                    responsive: [
                      {
                        breakpoint: 1200,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 2,
                        }
                      },
                      {
                        breakpoint: 640,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 2
                        }
                      }
                    ]
                  }}
                  className={`products-slider ${styles.sliderContainer}`}
                >
                  {({ data }) => (
                    <>
                      {data.title === "placeholder" ? (
                        <div></div>
                      ) : (
                        <>
                          <div role="button" className={styles.item} onClick={() => setProductTab(data.index)}>
                            <Image
                              src={data.image}
                              alt={data.title + " image"}
                              className={styles.image}
                              style={productTab !== data.index ? { filter: "grayscale(100%)" } : {}}
                            />
                            <div
                              className={styles.overlay}
                              style={productTab !== data.index ? {
                                background: "black",
                                opacity: 0.5
                              } : {}}
                            />
                            <p style={productTab !== data.index ? { opacity: 0.5 } : {}}>{data.title}</p>
                          </div>
                          <div className={styles.arrowContainer} style={{ opacity: productTab === data.index ? 1 : 0 }}>
                            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 2L12 13L22 2" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </SliderComponent>
                <div className={styles.detailsContainer}>
                  <div className={styles.buttons}>
                    <Button
                      text="Description"
                      color="#2590BE"
                      active={productButton === "description"}
                      onClick={() => setProductButton("description")}
                    />
                    <Button
                      text="Applications"
                      color="#2590BE"
                      active={productButton === "applications"}
                      onClick={() => setProductButton("applications")}
                    />
                  </div>
                  <div className={styles.detailsContent}>
                    {productButton === "description" ? (
                      <p>{products?.list[productTab]?.details?.description}</p>
                    ) : productButton === "applications" && (
                      <ul>
                        {products?.list[productTab]?.details?.applications?.map((el, i) => (
                          <li key={i}>{el}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
          {slug === "natural-stone" && (
            <>
              <section className={`custom-section-layout ${styles.applicationsSection}`}>
                <div className="columns-container">
                  <div className="left-column">
                    <h2 className="section-column-title">{applications?.heading}</h2>
                  </div>
                </div>
                <div className={styles.content}>
                  <p className={styles.sourceText}>Source: CRISIL Report</p>
                  <Image src={applications?.image} alt={applications?.heading + " image"} className={styles.image} />
                  <ul className={styles.list}>
                    {applications?.list?.map((el, i) => (
                      <li key={i}>{el}</li>
                    ))}
                  </ul>
                </div>
              </section>
              <section className={styles.projectsSection}>
                <h2 className={styles.sectionTitle}>{projects?.heading}</h2>
                <Slider {...projectsSliderSettings} className={styles.slideContainer}>
                  {projects?.slides?.map((el, i) => (
                    <div className={styles.slide} key={i}>
                      <Image src={isMobile ? el.image_mobile : el.image} alt={projects?.heading + " image"} className={styles.image} />
                      <div className={styles.imageOverlay} />
                      <p>{el.description}</p>
                    </div>
                  ))}
                </Slider>
              </section>
            </>
          )}
          {slug === "diamond-wire-tools" && (
            <>
              <DiamondWireApplications data={applications} />
              <DiamondWireFeatures data={features} />
            </>
          )}
          {slug === "natural-stone" && (
            <NaturalStoneSustainability data={sustainability} />
          )}
          {/* <section className={`custom-section-layout ${styles.contactSection}`}>
            <ImageSvg src="backgrounds/gray.svg" alt="gray background" className={styles.background} />
            <div>
              <span className="header-text" style={{ color: "white" }}>Contact Us</span>
              <div className="columns-container">
                <div className="left-column">
                  <h2 className="section-column-title">Get a Quote</h2>
                </div>
                <div className="right-column">
                  <form>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="email" placeholder="Email ID" />
                    <input type="tel" placeholder="Phone Number" />
                  </form>
                </div>
              </div>
            </div>
            <BackToTop />
          </section> */}
        </>
      ) : (
        <div>
          <p>Something went wrong!</p>
        </div>
      )}
    </Layout>
  )
}

export const materialQuery = graphql`
  query materialQuery($id: String!) {
    materialsJson(id: { eq: $id }) {
      id
      title
      slug
      banner {
        background
        background_mobile
        heading
      }
      description {
        image
        image_mobile
        left_column {
          icon
          title
        }
        right_column {
          description {
            type
            text
            array
          }
        }
        source
        list_flow
        list {
          text
          color
        }
      }
      strength {
        title
        right_column {
          content_one {
            description
            image
            image_mobile
          }
          content_two {
            description
            image
            image_mobile
          }
          table {
            title
            cell_header
            cell_body
          }
        }
      }
      market {
        title
        content {
          tabs {
            title
            list
          }
        }
      }
        marketgrowth {
          header
          right_column {
            list
          }
          left_column {
            title
          }
          list {
            title
            image
          }
        }
      products {
        heading
        list {
          title
          image
          details {
            description
            applications
            list {
              title
              text
              initial_text
              text_array
            }
          }
        }
      }
      applications {
        heading
        image
        slides
        list
        items {
          text
          text_array
        }
      }
      projects {
        heading
        slides {
          image
          image_mobile
          description
        }
      }
      sustainability {
        heading
        list {
          title
          content {
            text
            background
            image
          }
        }
      }
      features {
        heading
        list {
          title
          text
          background
        }
      }
    }
  }
`

export default MaterialsPage;
