import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import Banner from "@components/banner"
import Seo from "@components/seo"
import { Image } from "@components/Image"
import { ImageSvg } from "@components/imageSvg"
// import BackToTop from "@components/back-to-top"
import { useWindowSize } from "@utils/useWindowSize"

import * as styles from "@styles/research.module.scss"

const ResearchPage = ({ data }) => {
  const  {
    banner,
    research,
    research_team,
    innovation,
    minerals_portfolio,
    stations,
    trucks,
    mining,
    laboratory,
    technologies
  } = data.research

  const { width } = useWindowSize()
  const [isMobile, setMobile] = useState(width < 640)
  const [isTablet, setTablet] = useState(width < 1140)

  useEffect(() => {
    function resize() {
      setMobile(width < 577)
      setTablet(width < 1140)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  },[width])

  return (
    <Layout>
      <Banner media={banner.background}>
        <h1>Pioneering<br />Sustainable Growth.</h1>
      </Banner>
      <div className={styles.backgroundSections}>
        <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} />
        <section className={`custom-section-layout ${styles.rdSection}`}>
          <span className={`header-text ${styles.header}`}>{research?.header}</span>
          <div className="columns-container">
            <div className="left-column">
              <ImageSvg src={research?.left_column?.icon} alt="research icon" className={`icon ${styles.icon}`} />
              <h2 className="section-column-title">{research?.left_column?.title}</h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">
                {research?.right_column?.description}
              </p>
            </div>
          </div>
        </section>
        <section className={`custom-section-layout ${styles.researchTeamSection}`}>
          {/* <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} /> */}
          <Image src={research_team.image} alt="" className={styles.image} />
          <div className={styles.sectionWrapper}>
            <span className={`header-text ${styles.header}`}>{research_team?.header}</span>
            <div className="columns-container">
              <div className="left-column">
                <h2 className="section-column-title">{research_team?.left_column?.title}</h2>
              </div>
              <div className="right-column">
                <p className="section-column-description">
                  {research_team?.right_column?.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className={`custom-section-layout ${styles.innovationSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{innovation?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {innovation?.right_column?.description}
            </p>
            <div className={styles.content}>
              <h3 style={{ marginTop:"21px"}}>Key Improvements:</h3>
              <ul className={styles.improvementList}>
                {innovation?.content?.key_improvements?.map((el,i) => (
                  <li key={i}>
                    <ImageSvg src={el.color} alt="" className={styles.background} />
                    <div>
                      <h4>{el.title}</h4>
                      <p>{el.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
            </div>
          </div>
        </div>
        <div className="columns-container">
          <div className="left-column">
            <h2 className={`section-column-title`}>Production of Diamond Wire Tools.</h2>
          </div>
          <div className="right-column">
            
            <div className={styles.content}>
              
              <h3>We produce three types of Diamond Wire:</h3>
              <ul className={styles.wireList}>
                {innovation?.content?.wire_types?.map((el,i) => (
                  <li key={i}>
                    <ImageSvg src={el.color} alt="" className={styles.background} />
                    <div>
                      <h4>{el.title}</h4>
                      <p>{el.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className={styles.textArray}>
                {innovation?.content?.text?.map((el,i) => (
                  <li key={i}>
                    {el.split("<br/>").map((item) => (
                      <p>{item}</p>
                    ))}
                  </li>
                ))}
              </ul>
              <Image src={innovation?.content?.image} alt="" className={styles.image} />
            </div>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.mineralsSection}`}>
        {isMobile && (
          <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} />
        )}
        <div className={styles.sectionWrapper}>
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">{minerals_portfolio?.left_column?.title}</h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">
                {minerals_portfolio?.right_column?.description}
              </p>
              <div className={styles.content}>
                <h3>Key Projects:</h3>
                <ul>
                  {minerals_portfolio?.content?.key_projects?.map((el,i) => (
                    <li key={i}>
                      <ImageSvg src={el.color} alt="" className={styles.background} />
                      <div>
                        <h4>{el.title}</h4>
                        <p>{el.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className={styles.text}>{minerals_portfolio?.content?.text}</p>
              </div>
            </div>
          </div>
        </div>
        <Image src={isTablet ? minerals_portfolio?.image_mobile : minerals_portfolio?.image} alt="" className={styles.image} />
      </section>
      <div className={styles.backgroundSections}>
      <section className={`custom-section-layout ${styles.stationsSection}`}>
        <div className={styles.sectionWrapper}>
          <div className="columns-container">
            <div className="left-column">
              <h2 className="section-column-title">{stations?.left_column?.title}</h2>
            </div>
            <div className="right-column">
              <p className="section-column-description">
                {stations?.right_column?.description}
              </p>
              <div className={styles.content}>
                <h3>{stations?.content?.impacts?.title}</h3>
                <ul>
                  {stations?.content?.impacts?.list?.map((el,i) => (
                    <li key={i}>
                      <ImageSvg src={el.color} alt="" className={styles.listBackground} />
                      <div>
                        <h4>{el.title}</h4>
                        <p>{el.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Image src={isMobile ? stations?.image_mobile : stations?.image} alt="" className={styles.image} />
      </section>
        {/* <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} /> */}
        <section className={`custom-section-layout ${styles.trucksSection}`}>
          <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} />
          <div className={styles.sectionWrapper}>
            <span className={`header-text ${styles.header}`}>{trucks?.header}</span>
            <div className="columns-container">
              <div className="left-column">
                <h2 className="section-column-title">{trucks?.left_column?.title}</h2>
              </div>
              <div className="right-column">
                <p className="section-column-description">
                  {trucks?.right_column?.description}
                </p>
                <div className={styles.content}>
                  <h3>{trucks?.content?.benefits?.title}</h3>
                  <ul>
                    {trucks?.content?.benefits?.list?.map((el,i) => (
                      <li key={i}>
                        <ImageSvg src={el.color} alt="" className={styles.listBackground} />
                        <p>{el.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image src={trucks.image} alt="" className={styles.image} />
          </div>
        </section>
      </div>
      <section className={`custom-section-layout ${styles.miningSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{mining?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {mining?.right_column?.description}
            </p>
            <div className={styles.content}>
              <h3>{mining?.content?.title}</h3>
              <ul>
                {mining?.content?.list?.map((el,i) => (
                  <li key={i}>
                    <ImageSvg src={el.color} alt="" className={styles.background} />
                    <p>{el.description}</p>
                  </li>
                ))}
              </ul>
              <Image src={mining?.content?.image} alt="" className={styles.image} />
            </div>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.laboratorySection}`}>
        <span className="header-text">{laboratory?.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{laboratory?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {laboratory?.right_column?.description}
            </p>
            <div className={styles.content}>
              <h3>{laboratory?.content?.title}</h3>
              <ul>
                {laboratory?.content?.list?.map((el,i) => (
                  <li key={i}>
                    <ImageSvg src={el.color} alt="" className={styles.background} />
                    <p>{el.description}</p>
                  </li>
                ))}
              </ul>
              <Image src={laboratory?.content?.image} alt="" className={styles.image} />
            </div>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.techSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{technologies?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {technologies?.right_column?.description}
            </p>
            <div className={styles.content}>
              <h3>{technologies?.content?.title}</h3>
              <ul>
                {technologies?.content?.list?.map((el,i) => (
                  <li key={i}>
                    <ImageSvg src={el.color} alt="" className={styles.background} />
                    <p>{el.description}</p>
                  </li>
                ))}
              </ul>
              <Image src={technologies?.content?.image} alt="" className={styles.image} />
            </div>
          </div>
        </div>
      </section>
      {/* <BackToTop /> */}
    </Layout>
  )
}

export const Head = () => <Seo title="R&D" />

export const researchPageQuery = graphql`
  query content {
    research: researchJson {
      banner {
        background
      }
      research {
        header
        left_column {
          icon
          title
        }
        right_column {
          description
        }
      }
      research_team {
        header
        image
        left_column {
          title
        }
        right_column {
          description
        }
      }
      innovation {
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          key_improvements {
            title
            description
            color
          }
          wire_types {
            title
            description
            color
          }
          text
          image
        }
      }
      minerals_portfolio {
        image
        image_mobile
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          key_projects {
            title
            description
            color
          }
          text
        }
      }
      stations {
        image
        image_mobile
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          impacts {
            title
            list {
              title
              description
              color
            }
          }
        }
      }
      trucks {
        header
        image
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          benefits {
            title
            list {
              description
              color
            }
          }
        }
      }
      mining {
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          title
          list {
            description
            color
          }
          image
        }
      }
      laboratory {
        header
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          title
          list {
            description
            color
          }
          image
        }
      }
      technologies {
        left_column {
          title
        }
        right_column {
          description
        }
        content {
          title
          list {
            description
            color
          }
          image
        }
      }
    }
  }
`

export default ResearchPage
