import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Banner from "@components/banner"
import { Image } from "@components/Image"
import { ImageSvg } from "@components/imageSvg"
import { Button } from "@components/button"
import { Dropdown } from "@components/dropdown"
import { useWindowSize } from "@utils/useWindowSize"
import ImagesSlider from "../components/ImagesSlider"

import * as styles from "@styles/csr.module.scss"

const CsrPage = ({ data }) => {
  const {
    banner,
    // value,
    // value_business,
    initiatives,
    education,
    support,
    healthcare,
    rural_development,
    livelihood,
    committee,
    future,
  } = data.csr

  const [educationTab, setEducationTab] = useState(0)
  const [developmentTab, setDevelopmentTab] = useState(0)

  const { width } = useWindowSize()
  const [isMobile, setMobile] = useState(width < 640)

  useEffect(() => {
    function resize() {
      setMobile(width < 640)
    }
    resize()
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [width])

  return (
    <Layout>
      <Banner
        media={isMobile ? banner.background_mobile : banner.background}
        // classnames={styles.customBanner}
      >
        {banner?.heading?.split("<br/>").map((heading, index) => (
          <h1 key={index}>{heading}</h1>
        ))}
        {/* <h1>{banner.heading}</h1> */}
      </Banner>
      {/* <section className={`custom-section-layout ${styles.valueSection}`}>
        <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} />
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">
              {value?.left_column?.title}
            </h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {value?.right_column?.description}
            </p>
            <div className={styles.content}>
              <div className={styles.quoteContainer}>
                <blockquote>
                  <h3>{value?.content?.quote?.text}<span>”</span></h3>
                </blockquote>
                <p className={styles.author}>
                  <span>{value?.content?.quote?.author}</span>
                  <span>{value?.content?.quote?.designation}</span>
                </p>
              </div>
              <p className={styles.contentText}>{value?.content?.text}</p>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className={`custom-section-layout ${styles.valueBusinessSection}`}>
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
      </section> */}
      <section className={`custom-section-layout ${styles.initiativesSection}`}>
        <span className="header-text">{initiatives?.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{initiatives?.left_column?.title}</h2>
          </div>
        </div>
        <ul>
          {initiatives?.list?.map((item, index) => (
            <li key={index}>
              <ImageSvg src={item.background} alt="" className={styles.background} />
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className={`custom-section-layout ${styles.educationSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{education?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">{education?.right_column?.description}</p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            {!isMobile &&
              education?.list?.map((item, index) => (
                <Button
                  text={item?.title}
                  color="#91CB00"
                  active={index === educationTab}
                  onClick={() => setEducationTab(index)}
                />
              ))}
            {isMobile && (
              <Dropdown
                backgroundColor="#91CB00"
                items={education?.list?.map(el => el.title)}
                setItem={i => setEducationTab(i)}
              />
            )}
          </div>
          <div className={styles.tabContentContainer}>
            <ImagesSlider slides={education?.list?.[educationTab]?.imageslist} />
            <p>{education?.list?.[educationTab]?.description}</p>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.supportSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{support?.left_column?.title}</h2>
          </div>
          <div className="right-column" style={{ maxWidth: "820px" }}>
            <p className="section-column-description">{support?.right_column?.description}</p>
            <div className={styles.content}>
              <div className={styles.infoCard}>
                <ImageSvg
                  src={support?.content?.info?.background}
                  alt=""
                  className={styles.background}
                />
                <h3>{support?.content?.info?.heading}</h3>
                <p>{support?.content?.info?.description}</p>
              </div>
              {/* <Image src={support?.content?.image} alt="" className={styles.image} /> */}
              <ImagesSlider slides={support?.content?.imageslist} />
            </div>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.healthcareSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{healthcare?.left_column?.title}</h2>
          </div>
          <div className="right-column" style={{ maxWidth: "820px" }}>
            <p className="section-column-description">{healthcare?.right_column?.description}</p>
            <div className={styles.content}>
              <ul>
                {healthcare?.list?.map((item, index) => (
                  <li key={index}>
                    <ImageSvg src={item.background} alt="" className={styles.background} />
                    <h3>{item.heading}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
              <ImagesSlider slides={healthcare?.imageslist} />
            </div>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.ruralDevelopmentSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{rural_development?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {rural_development?.right_column?.description}
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            {rural_development?.list?.map((item, index) => (
              <Button
                text={item?.title}
                color="#91CB00"
                active={index === developmentTab}
                onClick={() => setDevelopmentTab(index)}
              />
            ))}
          </div>
          <div className={styles.tabContentContainer}>
            <Image
              src={rural_development?.list?.[developmentTab]?.image}
              alt={rural_development?.list?.[developmentTab]?.title}
              className={styles.image}
            />
            <p>{rural_development?.list?.[developmentTab]?.description}</p>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.livelihoodSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{livelihood?.left_column?.title}</h2>
          </div>
          <div className="right-column" style={{ maxWidth: "820px" }}>
            <p className="section-column-description">{livelihood?.right_column?.description}</p>
            <div className={styles.content}>
              <ul>
                {livelihood?.list?.map((item, index) => (
                  <li key={index}>
                    <ImageSvg src={item.background} alt="" className={styles.background} />
                    <h3>{item.heading}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
              <ImagesSlider slides={livelihood?.imageslist} />
            </div>
          </div>
        </div>
      </section>
      <div className={styles.endSections}>
        <ImageSvg src="backgrounds/gray.svg" alt="" className={styles.background} />
        <section className={`custom-section-layout ${styles.committeeSection}`}>
          {/* <ImageSvg src="backgrounds/gray.svg" alt="" className={styles.background} /> */}
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">{committee?.left_column?.title}</h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">{committee?.right_column?.description}</p>
            </div>
          </div>
        </section>
        <section className={`custom-section-layout ${styles.futureSection}`}>
          {/* <ImageSvg src="backgrounds/gray.svg" alt="" className={styles.background} /> */}
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">{future?.left_column?.title}</h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">{future?.right_column?.description}</p>
              <p className={styles.contentText}>{future?.text}</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO title="CSR" />

export const CsrPageQuery = graphql`
  query content {
    csr: csrJson {
      banner {
        heading
        background
        background_mobile
      }
      value {
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          quote {
            text
            author
            designation
          }
          text
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
      initiatives {
        header
        left_column {
          title
        }
        list {
          description
          background
        }
      }
      education {
        left_column {
          title
        }
        right_column {
          description
        }
        list {
          title
          description
          imageslist {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 900)
            }
          }
        }
      }
      support {
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          info {
            heading
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
      }
      healthcare {
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
        image
        imageslist {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 900)
          }
        }
      }
      rural_development {
        left_column {
          title
        }
        right_column {
          description
        }
        list {
          image
          title
          description
        }
      }
      livelihood {
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

export default CsrPage
