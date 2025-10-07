import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "@components/layout"
import Seo from "@components/seo"
import Banner from "@components/banner"
import { ImageSvg } from "@components/imageSvg"
import { KnowMoreLink } from "@components/know-more"
import { Button } from "@components/button"
import { SliderComponent, SimpleSlider } from "@components/slider"
// import { FlipCard } from "@components/flip-card"
import { withBoldText } from "@utils/withBoldText"
import { useWindowSize } from "@utils/useWindowSize"
import Carousel from "@components/carousel"
import * as styles from "@styles/index.module.scss"

const textureBg = {
  "backgrounds/orange.svg": { alt: "orange" },
  "backgrounds/green.svg": { alt: "green" },
  "backgrounds/blue.svg": { alt: "blue" },
  "backgrounds/gray.svg": { alt: "gray" },
}

const OPTIONS = { loop: true }

const IndexPage = ({ data }) => {
  const { banner, introduction, about, deliver, story, offerings } = data.home

  const { width } = useWindowSize()
  const [isMobile, setMobile] = useState(width < 640)
  const [isTable, setTable] = useState(width < 1024 && width > 640)

  useEffect(() => {
    function resize() {
      setMobile(width < 577)
    }
    resize()
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [width])

  const [offeringsTab, setOfferingsTab] = useState("materials")

  return (
    <Layout>
      <div className={styles.homeContainer}>
        <Carousel images={banner.images} options={OPTIONS}>
          {banner.title_heading_1}
        </Carousel>
        <section className={`custom-section-layout ${styles.introductionSection}`}>
          <span className="header-text">{introduction?.header}</span>
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">{introduction?.left_column?.title}</h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">
                {introduction?.right_column?.description}
              </p>
            </div>
          </div>
          <ul>
            {introduction?.list_cards?.map((card, index) => (
              <li key={index}>
                <ImageSvg
                  src={card.background}
                  alt={textureBg[card.background]?.alt}
                  className={styles.background}
                />
                <p>{withBoldText(card.description)}</p>
              </li>
            ))}
          </ul>
          <p className={styles.sourceText}>Source: CRISIL Report</p>
        </section>
        <section className={`custom-section-layout ${styles.aboutSection}`}>
          {/* <ImageSvg src="backgrounds/gray.svg" alt="gray background" className={styles.background} /> */}
          <div>
            <div>
              <span className="header-text" style={{ color: "white" }}>
                {about.header}
              </span>
              <div className="columns-container">
                <div className="left-column">
                  <h2 className="section-column-title">{about.left_column?.title}</h2>
                </div>
                <div className={`right-column ${styles.rightColumn}`}>
                  <p className="section-column-description">{about.right_column?.description}</p>
                </div>
              </div>
            </div>
            <div className={styles.aboutImagesContainer}>
              <ImageSvg src={about.image} alt="stones" />
              {/* {isMobile ? (
                <ImageSvg src="homepage/granite-rock-1.svg" alt="rock" />
              ) : (
                <ImageSvg src="homepage/granite-rocks.svg" alt="rocks" />
              )} */}
              {/* <img src={RockImg1} alt="granite rock 1" />
              <img src={RockImg2} alt="granite rock 2" /> */}
            </div>
          </div>
        </section>
        <section className={`custom-section-layout ${styles.approachSection}`}>
          <div className={styles.sectionWrapper}>
            <span className="header-text">{deliver.header}</span>
            <div className="columns-container">
              <div className="left-column">
                <ImageSvg
                  src={deliver.left_column?.icon}
                  alt="approach icon"
                  className={`icon ${styles.icon}`}
                />
                <h2 className="section-column-title">{deliver.left_column?.title}</h2>
              </div>
              <div className={`right-column ${styles.rightColumn}`}>
                <p className="section-column-description">{deliver.right_column?.description}</p>
              </div>
            </div>
            {/* {!isMobile && <SliderComponent */}
            <SliderComponent
              slides={deliver?.list ?? []}
              options={{
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: true,
                mobileFirst: true,
                responsive: [
                  /* {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                    }
                  }, */
                  /* {
                    breakpoint: 600,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }
                  }, */
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false,
                    },
                  },
                ],
              }}
              className={styles.desktopSlider}
            >
              {({ data }) => (
                <div className={styles.slide}>
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                </div>
              )}
            </SliderComponent>
          </div>
          {/* {isMobile && <SimpleSlider className={styles.mobileSlider}>
            {chunkArray(deliver?.list || [], 4).map((slideGroup, index) => (
              <div key={index} className={styles.slide}>
                {slideGroup.map((data, itemIndex) => (
                  <div key={itemIndex} className={styles.slideItem}>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </SimpleSlider>} */}
        </section>
        <section className={`custom-section-layout ${styles.storySection}`}>
          <span className="header-text">{story.header}</span>
          <div className="columns-container">
            <div className="left-column">
              <ImageSvg src={story.left_column?.icon} alt="story icon" className="icon" />
              <h2 className="section-column-title">{story.left_column?.title}</h2>
            </div>
            <div className={`right-column ${styles.rightColumn}`}>
              <p className="section-column-description">{story.right_column?.description}</p>
              <ul>
                {story.right_column?.list?.map((card, index) => (
                  <li key={index}>
                    {/* <FlipCard key={index} card={index}>
                      {({ isFlipped }) => (
                        <> */}
                    <ImageSvg
                      src={card.background}
                      alt={textureBg[card.background]?.alt}
                      className={styles.cardBackground}
                    />
                    <h3>{card.title}</h3>
                    <p className={styles.initialText}>{card.initial_text}</p>
                    <p className={styles.description}>{card.description}</p>
                    {/* </>
                      )}
                    </FlipCard> */}
                  </li>
                ))}
              </ul>
              <KnowMoreLink
                text={story.right_column?.link?.text}
                href={story.right_column?.link?.href}
                classnames={styles.link}
              />
            </div>
          </div>
        </section>
        <section className={`custom-section-layout ${styles.offeringsSection}`}>
          <span className="header-text">{offerings.header}</span>
          <div className="columns-container">
            <div className="left-column">
              <ImageSvg src={offerings.left_column?.icon} alt="approach icon" className="icon" />
              <h2 className="section-column-title">{offerings.left_column?.title}</h2>
            </div>
            <div className={`right-column ${styles.rightColumn}`}>
              <p className="section-column-description">
                {offeringsTab === "materials" && offerings.right_column?.description}
              </p>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.buttonsContainer}>
              <Button
                text={offerings.materials?.title}
                color="#91CB00"
                active={offeringsTab === "materials"}
                onClick={() => setOfferingsTab("materials")}
              />
              <Button
                text={offerings.processing?.title}
                color="#91CB00"
                active={offeringsTab === "processing"}
                onClick={() => setOfferingsTab("processing")}
              />
            </div>
            {offeringsTab === "materials" && (
              <ul className={styles.listContainer}>
                {offerings?.materials?.list?.map((item, index) => (
                  <li key={index}>
                    <ImageSvg src="backgrounds/green.svg" alt="" className={styles.background} />
                    <h3>{item.heading ? item.heading : "Lorem Ipsum"}</h3>
                    {item.description && <p>{item.description}</p>}
                    {isMobile ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.8518 15L10.89 5.01285L1.00005 4.9743"
                          stroke="white"
                          strokeWidth="1.25"
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="10.4945"
                          y1="5.34402"
                          x2="1.42196"
                          y2="13.7187"
                          stroke="white"
                          strokeWidth="1.25"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="24"
                        viewBox="0 0 14 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 22.2393L12.0692 12.0704L2 2.09847"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <Link to={item.link} className={styles.link} />
                  </li>
                ))}
              </ul>
            )}
            {offeringsTab === "processing" && (
              <div className={styles.processingContainer}>
                <p>{offerings?.processing?.description}</p>
                <KnowMoreLink
                  text={offerings.link?.text}
                  href={offerings.link?.href}
                  classnames={styles.link}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const homepageQuery = graphql`
  query content {
    home: homeJson {
      banner {
        images
        title_heading_1
        title_heading_2
      }
      introduction {
        header
        left_column {
          title
        }
        right_column {
          description
        }
        list_cards {
          description
          color
          background
        }
      }
      about: quick_about {
        header
        image
        left_column {
          title
        }
        right_column {
          description
          list_cards {
            title
            description
          }
        }
      }
      deliver: what_we_deliver {
        header
        left_column {
          icon
          title
        }
        right_column {
          description
        }
        list {
          title
          description
        }
      }
      story: our_story {
        header
        left_column {
          icon
          title
        }
        right_column {
          description
          list {
            title
            initial_text
            description
            color
            background
          }
          link {
            text
            href
          }
        }
      }
      offerings {
        header
        left_column {
          icon
          title
        }
        right_column {
          description
        }
        materials {
          title
          list {
            heading
            description
            link
          }
        }
        processing {
          title
          description
        }
        link {
          text
          href
        }
      }
    }
  }
`

export default IndexPage
