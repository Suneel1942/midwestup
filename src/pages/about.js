import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Slider from "react-slick";

import Layout from "@components/layout"
import Banner from "@components/banner"
import Seo from "@components/seo"
import { Button } from "@components/button"
import { Image } from "@components/Image"
import { ImageSvg } from "@components/imageSvg"
import { KnowMoreLink } from "@components/know-more"
import { SliderComponent, SimpleSlider } from "@components/slider"
import { AchievementsList } from "@components/achievements-list"
import { useWindowSize } from "@utils/useWindowSize"
import { IndiaMap } from "../components/india-map";
import { WorldMap } from "../components/world-map";

import * as styles from "@styles/about.module.scss"

const AboutPage = ({ data }) => {
  const  {
    banner,
    about,
    history,
    statements,
    esg,
    csr,
    // story,
    strategy,
    slides,
    research,
    achievements,
    // partners,
    management,
    board,
    presence
  } = data.about

  // const [storyTab, setStoryTab] = useState("purpose")
  const [achievementTab, setAchievementTab] = useState(0)
  // const [partnerTab, setPartnerTab] = useState(0)
  const [regionsTab, setRegionsTab] = useState(0)
  const [indiaMapCode, setIndiaMapCode] = useState("AP")
  const [worldMapCode, setWorldMapCode] = useState("Asia")

  let sliderRef = React.useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const prev = () => {
    sliderRef.slickPrev();
  };

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const sliderSettings = {
    nextArrow: <button style={{ display: "none" }} />,
    prevArrow: <button style={{ display: "none" }}/>,
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    beforeChange: (prev,next) => setCurrentSlide(next),
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "27px" : "53px",
          left: isMobile ? "35px" : "80px",
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
          height: isMobile ? "6px" : "15px",
          width: isMobile ? "6px" : "15px",
          borderRadius: "100%",
          border: "1px solid white",
          background: i === currentSlide ? "white" : "transparent",
          cursor: "pointer"
        }}
      />
    )
  }

  const { width } = useWindowSize()
  const [isMobile, setMobile] = useState(width < 767)
  const [isTablet, setTablet] = useState(width < 1024 && width > 767)
  const [isDesktop, setDesktop] = useState(width > 1024)
  const [isMobileTablet, setMobileTablet] = useState(width < 1025)

  useEffect(() => {
    function resize() {
      setMobile(width < 577)
      setMobileTablet(width < 1025)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  },[width])

  return (
    <Layout>
      <Banner media={isMobile ? banner.background_mobile : banner.background}>
        <h1>Grounded in Values,<br/>Operating with Purpose.</h1>
      </Banner>
      <section className={`custom-section-layout  ${styles.aboutSection}`}>
        <ImageSvg src={about.background} alt="" className={styles.background} />
        <div className={styles.sectionWrapper}>
          <span className={`header-text ${styles.header}`}>{about.header}</span>
          <div className="columns-container">
            <div className="left-column">
              <ImageSvg src={about.left_column?.icon} alt="about icon" className="icon" />
              <h2 className="section-column-title">{about.left_column?.title}</h2>
            </div>
            <div className={`right-column ${styles.rightColumn}`}>
              <p className="section-column-description abtus">
                <span>{about.right_column?.description.paragraph1}</span>
                <span>{about.right_column?.description.paragraph2}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={about.image} alt="" className={styles.imageBackground} />
        </div>
      </section>
      <section className={`custom-section-layout ${styles.historySection}`}>
        <span className="header-text">{history.header}</span>
        <div className={`columns-container`}>
          <div className="left-column">
            <ImageSvg src={history.left_column?.icon} alt="about icon" className={`icon ${styles.icon}`} />
            <h2 className="section-column-title">{history.left_column?.title}</h2>
          </div>
          <div className={`right-column ${styles.rightColumn}`}>
            <div className={styles.text}>
              <p>{history.content?.description}</p>
            </div>
            <Image src={history.content.image} alt="founder" className={styles.image} />
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.statementsSection}`}>
        {/* <ImageSvg src={statements.background} alt="" className={styles.background} /> */}
        <Image src={statements.image} alt="" className={styles.image} />
        <div className={styles.sectionWrapper}>
          <div className={styles.content}>
            <div className={styles.mission}>
              <ImageSvg src={statements.mission.background} alt="" className={styles.cardBg} />
              <h3>{statements.mission.title}</h3>
              <p>{statements.mission.description}</p>
            </div>
            <div className={styles.vision}>
              <ImageSvg src={statements.vision.background} alt="" className={styles.cardBg} />
              <h3>{statements.vision.title}</h3>
              <p>{statements.vision.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.esgSection}`}>
        <span className="header-text">{esg.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{esg.title}</h2>
          </div>
          <div className={`right-column ${styles.rightColumn}`}>
            <p className="section-column-description">{esg.description}</p>
          </div>
        </div>
        <KnowMoreLink text={esg.link?.text} href={esg.link?.url} classnames={styles.link} />
      </section>
      <section className={`custom-section-layout ${styles.csrSection}`}>
        <span className="header-text">{csr.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{csr.title}</h2>
          </div>
          <div className={`right-column ${styles.rightColumn}`}>
            <p className="section-column-description">{csr.description}</p>
          </div>
        </div>
        <KnowMoreLink text={csr.link?.text} href={csr.link?.url} classnames={styles.link} />
      </section>
      {/* <section className={`custom-section-layout ${styles.storySection}`}>
        <div className={styles.sectionContainer}>
          <ImageSvg src={story.background} alt="" className={styles.background} />
          <span className={`header-text ${styles.header}`}>{story.header}</span>
          <div className="columns-container">
            <div className="left-column">
              <ImageSvg src={story.left_column?.icon} alt="about icon" className="icon" />
              <h2 className="section-column-title">{story.left_column?.title}</h2>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.tabsContainer}>
              <div className={styles.buttonsContainer}>
                <Button
                  color="#F68F6C"
                  text={story.content?.purpose.title}
                  active={storyTab === "purpose"}
                  onClick={() => setStoryTab("purpose")}
                />
                <Button
                  color="#F68F6C"
                  text={story.content?.ethos.title}
                  active={storyTab === "ethos"}
                  onClick={() => setStoryTab("ethos")}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  variants={tabContentVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className={styles.tabDescription}
                >
                  <p>
                    {storyTab === "purpose" && story.content.purpose.description}
                    {storyTab === "ethos" && story.content.ethos.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section> */}
      <section className={`custom-section-layout ${styles.strategySection}`}>
        <div className={styles.sectionWrapper}>
          <span className="header-text">{strategy.header}</span>
          <div className="columns-container">
            <div className="left-column">
              <ImageSvg src={strategy.left_column?.icon} alt="strategy icon" className="icon" />
              <h2 className="section-column-title">{strategy.left_column?.title}</h2>
            </div>
            <div className={`right-column ${styles.rightColumn}`}>
              <p className="section-column-description">{strategy.right_column.description}</p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <SimpleSlider className="strategy-slider">
            {strategy.slides[isMobile ? "mobile" : "desktop"].map((el,index) => (
              <div key={index} className="strategy-slide-container">
                <ImageSvg src={el} alt={"slide " + index+1} className="strategy-slide" />
              </div>
            ))}
          </SimpleSlider>
        </div>
      </section>
      <section className={styles.slidesSection}>
        <Slider
          {...sliderSettings}
          ref={slider => {
            sliderRef = slider;
          }}
        >
          {slides["desktop"].map((el, index) => (
            <React.Fragment key={index}>
              <Image src={el} alt={"slide " + index+1} className={styles.image} />
              <div className={styles.overlay} />
            </React.Fragment>
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
      </section>
      <section className={`custom-section-layout ${styles.researchSection}`}>
        <span className="header-text">{research.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <ImageSvg src={research.left_column?.icon} alt="strategy icon" className="icon" />
            <h2 className="section-column-title">{research.left_column?.title}</h2>
          </div>
          <div className={`right-column ${styles.rightColumn}`}>
            <p className="section-column-description">{research.right_column.description}</p>
          </div>
        </div>
        <h3 className={styles.listTitle}>{research.list_title}</h3>
        <ul className={styles.listContainer}>
          {research.list?.map((item, index) => (
            <li key={index}>
              <ImageSvg src={item.background} alt="" className={styles.background} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
        <KnowMoreLink text="Read More" href="/research-and-development" classnames={styles.link} />
      </section>
      <section className={`custom-section-layout ${styles.achievementsSection}`}>
        <div className={styles.sectionWrapper}>
          <span className="header-text">{achievements.header}</span>
          <div className="columns-container">
            <div className={`left-column ${styles.leftColumn}`}>
              <ImageSvg src={achievements.left_column?.icon} alt="strategy icon" className="icon" />
              <h2 className="section-column-title">{achievements.left_column?.title}</h2>
            </div>
            <div className={`right-column ${styles.rightColumn}`}>
              <p className="section-column-description">{achievements.right_column.description}</p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {isMobileTablet && <ul className={styles.listContainer}>
            {["Certificates","Awards"].map((item,index) => (
              <li key={index}>
                <Button
                  color="#91CB00"
                  text={item}
                  active={achievementTab === index}
                  onClick={() => setAchievementTab(index)}
                />
              </li>
            ))}
          </ul>}
          {!isMobileTablet && (
            <AchievementsList
              data={achievements.list}
              // limit={8}
              achievementTab={achievementTab}
              setAchievementTab={setAchievementTab}
              className={styles.listContainer}
              listclassname={styles.list}
            />
          )}
          <div className={styles.tabContent}>
            {!isMobileTablet && (
              <>
                <div
                  className={styles.image}
                  style={{
                    "--award-border": achievements.list[achievementTab].type === "certificate" ? "1px solid gray" : 0,
                  }}
                >
                  <Image
                    src={achievements.list[achievementTab].content.image}
                    alt={achievements.list[achievementTab].title}
                    style={{
                      "--award-img-fit": achievements.list[achievementTab].type === "certificate" ? "contain" : "cover"
                    }}
                  />
                </div>
                <p>{achievements.list[achievementTab].content.text}</p>  
              </>
            )}
            {isMobileTablet && (
              <SliderComponent
                slides={achievements.list.filter(item => {
                  return item.type === (achievementTab === 0 ? "certificate" : "award")
                })}
                className={styles.mobileSlider}
              >
                {({ data }) => (
                  <>
                    <h3>{data?.title}</h3>
                    <div className={styles.image}>
                      <Image
                        src={data?.content?.image}
                        alt={data?.title}
                        style={{ "--award-img-fit": data?.type === "certificate" ? "contain" : "cover" }}
                      />
                    </div>
                    <p>{data?.content?.text}</p>
                  </>
                )}
              </SliderComponent>
            )}
          </div>
        </div>
      </section>
      {/* <section className={`custom-section-layout ${styles.partnersSection}`}>
        <span className="header-text">{partners.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <ImageSvg src={partners.left_column?.icon} alt="partners icon" className="icon" />
            <h2 className="section-column-title">{partners.left_column?.title}</h2>
            <ul className={styles.buttonsContainer}>
              {partners.list.map((el,i) => (
                <li key={i}>
                  <Button
                    color="#2590BE"
                    text={el.title}
                    active={partnerTab === i}
                    onClick={() => setPartnerTab(i)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={`right-column ${styles.rightColumn}`}>
            <ul className={styles.listContainer}>
              {partners.list[partnerTab]?.logos?.map((logo, index) => (
                <li key={index}>
                  <Image src={logo} alt="" className={styles.imageWrapper} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}
      <section className={`custom-section-layout ${styles.managementSection}`}>
        <ImageSvg src={management.background} alt="" className={styles.background} />
        <span className={`header-text ${styles.header}`}>{management.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <ImageSvg src={management.left_column?.icon} alt="strategy icon" className="icon" />
            <h2 className="section-column-title">{management.left_column?.title}</h2>
          </div>
          <div className={`right-column ${styles.rightColumn}`}>
            <p className="section-column-description">
              {management.right_column.description}
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.founderImage}>
            <Image src={management.founder.image} alt="" className={styles.imageWrapper} />
          </div>
          <div className={styles.founderDetails}>
            <div className={styles.founder}>
              <h3>{management.founder.name}</h3>
              <h3>{management.founder.designation}</h3>
            </div>
            <p>{management.founder.description}</p>
            {/* {!isMobile && <blockquote>
              “{management.founder.quote}”
            </blockquote>} */}
          </div>
        </div>
        {/* {!isMobile && (
          <button onClick={() => {}} className={styles.moreButton}>
            Read more
            <svg width="43" height="23" viewBox="0 0 43 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L21.5 22L41 2" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
          </button>
        )} */}
      </section>
      <section className={`custom-section-layout ${styles.boardSection}`}>
        <div className={`columns-container ${styles.sectionWrapper}`}>
          <div className="left-column">
            <h2 className="section-column-title">{board.header}</h2>
          </div>
        </div>
        <SliderComponent
          options={{
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          }}
          slides={board.members ?? []}
          slideClassName={styles.slideWrapper}
          className={styles.listContainer}
        >
          {({ data }) => (
            <div className={styles.slide}>
              <Image src={data.image} alt={data.name} className={styles.image} />
              <div className={styles.textContainer}>
                <h3>{data.name}</h3>
                <h4>{data.designation}</h4>
                <p>{data.description}</p>
              </div>
            </div>
          )}
        </SliderComponent>
      </section>
      <section className={`custom-section-layout ${styles.presenceSection}`}>
        <ImageSvg src="backgrounds/gray.svg" alt="gray background" className={styles.background} />
        <span className={`header-text ${styles.header}`}>{presence.header}</span>
        <div
          className={`
            columns-container
          `}
        >
          <div className={`left-column ${styles.leftColumn}`}>
            <ImageSvg src={presence.left_column?.icon} alt="partners icon" className={`icon ${styles.icon}`} />
            <h2 className="section-column-title">{presence.left_column?.title}</h2>
            <ul className={styles.buttonsContainer}>
              {presence.regions.map((region, index) => (
                <li key={index}>
                  <Button
                    color="#91CB00"
                    text={region?.title}
                    active={index === regionsTab}
                    onClick={() => setRegionsTab(index)}
                  />
                </li>
              ))}
            </ul>
            {!isMobile && (
              <>
                {(regionsTab === 0 && indiaMapCode) && (
                  <div className={styles.mapContent}>
                    <h2>{presence?.regions[regionsTab]?.list?.find(el => el.code === indiaMapCode)?.state}</h2>
                    <ul>
                      {presence?.regions[regionsTab]?.list?.find(el => el.code === indiaMapCode)?.cities?.map((el,i) => (
                        <li key={i}>{el}</li>
                      ))}
    
                    </ul>
                  </div>
                )}
                {(regionsTab === 1 && worldMapCode) && (
                  <div className={styles.mapContent}>
                    <h2>{presence?.regions[regionsTab]?.list?.find(el => el.code === worldMapCode)?.continent}</h2>
                    <ul style={{ maxHeight: "auto", flexWrap: "nowrap" }}>
                      {presence?.regions[regionsTab]?.list?.find(el => el.code === worldMapCode)?.countries?.map((el,i) => (
                        <li key={i}>{el}</li>
                      ))}
    
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={`right-column ${styles.rightColumn} ${regionsTab === 0  && styles.indiaColumn} ${regionsTab === 1  && styles.worldColumn}`}>
            {regionsTab === 0 && <IndiaMap onPathSelect={(code) => setIndiaMapCode(code)} className={styles.indiaMap} />}
            {regionsTab === 1 && <WorldMap onPathSelect={(code) => setWorldMapCode(code)} className={styles.worldMap} />}
          </div>
          {isMobile && (
            <>
              {regionsTab === 0 && !indiaMapCode && (
                <h2 className={styles.mapHeading}>{presence?.regions[0]?.description}</h2>
              )}
              {regionsTab === 1 && !worldMapCode && (
                <h2 className={styles.mapHeading}>{presence?.regions[1]?.description}</h2>
              )}
             {(regionsTab === 0 && indiaMapCode) && (
                <div className={styles.mapContent}>
                  <h2>{presence?.regions[regionsTab]?.list?.find(el => el.code === indiaMapCode)?.state}</h2>
                  <ul>
                    {presence?.regions[regionsTab]?.list?.find(el => el.code === indiaMapCode)?.cities?.map((el,i) => (
                      <li key={i}>{el}</li>
                    ))}

                  </ul>
                </div>
              )}
              {(regionsTab === 1 && worldMapCode) && (
                <div className={styles.mapContent}>
                  <h2>{presence?.regions[regionsTab]?.list?.find(el => el.code === worldMapCode)?.continent}</h2>
                  <ul style={{ maxHeight: "auto", flexWrap: "nowrap" }}>
                    {presence?.regions[regionsTab]?.list?.find(el => el.code === worldMapCode)?.countries?.map((el,i) => (
                      <li key={i}>{el}</li>
                    ))}

                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        {/* {regionsTab === 1 && (
          <div className={styles.worldMapContent}>
            <ul className={styles.continentList}>
              {presence?.regions[regionsTab]?.list?.map((item, i) => (
                <li key={i}>
                  <h3>{item.continent}</h3>
                  <ul
                    className={styles.countriesList}
                    style={{
                      "--countries-column-count": item.countries?.length > 5 ? 2 : 1
                    }}
                  >
                    {item.countries?.map((country, index) => (
                      <li key={index}>{country}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )} */}
        {/* <BackToTop /> */}
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Who We Are" />

export const aboutPageQuery = graphql`
  query content {
    about: aboutJson {
      banner {
        background
        background_mobile
        heading
      }
      about {
        header
        background
        image
        left_column {
          icon
          title
        }
        right_column {
          description {
            paragraph1
            paragraph2
          }
        }
      }
      history {
        header
        left_column {
          icon
          title
        }
        content {
          image
          description
        }
      }
      statements {
        background
        image
        mission {
          title
          description
          background
        }
        vision {
          title
          description
          background
        }
      }
      esg {
        header
        title
        description
        link {
          url
          text
        }
      }
      csr {
        header
        title
        description
        link {
          url
          text
        }
      }
      story {
        header
        background
        left_column {
          icon
          title
        }
        content {
          purpose {
            title
            description
          }
          ethos {
            title
            description
          }
        }
      }
      strategy {
        header
        left_column {
          icon
          title
        }
        right_column {
          description
        }
        slides {
          desktop
          mobile
        }
      }
      slides {
        mobile
        desktop
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
        list_title
        list {
          background
          description
        }
      }
      achievements {
        header
        left_column {
          icon
          title
        }
        right_column {
          description
        }
        list {
          type
          title
          content {
            image
            text
          }
        }
      }
      partners {
        header
        left_column {
          icon
          title
        }
        list {
          title
          logos
        }
      }
      management {
        background
        header
        left_column {
          icon
          title
        }
        right_column {
          description
        }
        founder {
          image
          name
          designation
          description
          quote
        }
        more_content {
          left_column {
            text
          }
          right_column {
            text
          }
          name
          designation
        }
      }
      board {
        header
        members {
          image
          name
          designation
          description
        }
      }
      presence {
        header
        left_column {
          icon
          title
        }
        regions {
          title
          description
          map
          list {
            state
            code
            description
            cities
            continent
            countries
          }
        }
      }
    }
  }
`

export default AboutPage
