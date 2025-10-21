import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import Banner from "@components/banner"
import Seo from "@components/seo"
import { Image } from "@components/Image"
import { ImageSvg } from "@components/imageSvg"
import { Button } from "@components/button"
import { Dropdown } from "@components/dropdown"
import { useWindowSize } from "@utils/useWindowSize"
// import BackToTop from "@components/back-to-top"
import { DRHPConfirmationModal } from "@components/drhp-confirmation-modal"
import { RHPConfirmationModal } from "@components/rhp-confirmation-modal"
import { MCMDConfirmationModal } from "@components/mcmd-confirmation-modal"
import { ProspectiveConfirmationModal } from "@components/prospective-confirmation-modal"
import Accordion from "@components/accordion"
import * as styles from "@styles/investments.module.scss"

const InvestmentsPage = ({ data }) => {
  const {
    banner,
    relations,
    case_study: caseStudy,
    financial_reports: financialReports,
    annual_reports: annualReports,
    documents,
    materials,
    policies,
    governance,
    committees,
    contact,
  } = data.investments

  const [financialReportTab, setFinancialReportTab] = useState(0)
  const [committeeTab, setCommitteeTab] = useState(0)
  const [openModal, setOpenModal] = useState({
    drhp: false,
    rhp: false,
    mcmd: false,
    prospective: false,
  })
  const [accordionState, setAccordionState] = useState({
    isMaterialAccordionOpen: false,
    isDocumentsAccordionOpen: false,
    mcmdConfirmed: false,
  })

  function toggleScroll() {
    document.getElementsByTagName("html")[0].classList.toggle("no-scroll")
  }

  function toggleMaterialAccordion() {
    if (!accordionState.mcmdConfirmed) return
    setAccordionState(prev => ({ ...prev, isMaterialAccordionOpen: !prev.isMaterialAccordionOpen }))
  }

  function toggleDocumentsAccordion() {
    if (!accordionState.mcmdConfirmed) return
    setAccordionState(prev => ({
      ...prev,
      isDocumentsAccordionOpen: !prev.isDocumentsAccordionOpen,
    }))
  }

  function openProspectiveModal() {
    setOpenModal(prev => ({ ...prev, prospective: true }))
    toggleScroll()
  }

  function openDRHPModal() {
    setOpenModal(prev => ({ ...prev, drhp: true }))
    toggleScroll()
  }

  function openRHPModal() {
    setOpenModal(prev => ({ ...prev, rhp: true }))
    toggleScroll()
  }

  function openMCMDModal() {
    if (accordionState.mcmdConfirmed) return

    setOpenModal(prev => ({ ...prev, mcmd: true }))
    toggleScroll()
  }

  function closeProspectiveModal(confirmed) {
    setOpenModal(prev => ({ ...prev, prospective: false }))
    toggleScroll()
    if (confirmed) {
      const doc = documents.find(el => el.title === "Prospectus Document")
      const newTabUrl = window.location.origin + doc?.pdf?.publicURL
      window.open(newTabUrl, "_blank", "noopener,noreferrer")
    }
  }

  function closeDRHPModal(confirmed) {
    setOpenModal(prev => ({ ...prev, drhp: false }))
    toggleScroll()

    if (confirmed) {
      const doc = documents.find(el => el.title === "DRHP Document")
      const newTabUrl = window.location.origin + doc?.pdf?.publicURL
      window.open(newTabUrl, "_blank", "noopener,noreferrer")
    }
  }

  function closeRHPModal(confirmed) {
    setOpenModal(prev => ({ ...prev, rhp: false }))
    toggleScroll()

    if (confirmed) {
      const doc = documents.find(el => el.title === "RHP Document")
      const newTabUrl = window.location.origin + doc?.pdf?.publicURL
      window.open(newTabUrl, "_blank", "noopener,noreferrer")
    }
  }

  function closeMCMDModal(confirmed) {
    setAccordionState(prev => {
      if (confirmed) {
        return {
          ...prev,
          mcmdConfirmed: true,
          isMaterialAccordionOpen: true,
          isDocumentsAccordionOpen: true,
        }
      }
      return prev
    })
    setOpenModal(prev => ({ ...prev, mcmd: false }))
    toggleScroll()
  }

  const { width } = useWindowSize()
  const [isMobile, setMobile] = useState(width < 640)

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

  return (
    <Layout>
      <Banner media={isMobile ? banner.background_mobile : banner.background}>
        <h1>
          Strength in Value,
          <br />
          Stability in Partnership.
        </h1>
      </Banner>
      <section className={`custom-section-layout ${styles.relationsSection}`}>
        <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} />
        <span className={`header-text ${styles.header}`}>{relations?.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{relations?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">{relations?.right_column?.description}</p>
            <ul className={styles.cardList}>
              {relations?.list?.map((el, i) => (
                <li key={i}>
                  <ImageSvg src="backgrounds/blue.svg" alt="" className={styles.background} />
                  <h4>{el.heading}</h4>
                  <p>{el.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* <section className={`custom-section-layout ${styles.caseStudySection}`}>
        <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} />
        <span className={`header-text ${styles.header}`}>{caseStudy?.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{caseStudy?.left_column?.title}</h2>
          </div>
        </div>
        <ul className={styles.listContainer}>
          {caseStudy?.list?.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section> */}
      <section className={`custom-section-layout ${styles.financialReportsSection}`}>
        <ImageSvg src="backgrounds/gray-light.svg" alt="" className={styles.background} />
        <span className={`header-text ${styles.header}`}>{financialReports.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{financialReports.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">
              {financialReports.right_column?.description}
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            {!isMobile &&
              financialReports?.reports?.map((el, i) => (
                <div key={i}>
                  <Button
                    text={el.title}
                    color="#91CB00"
                    active={financialReportTab === i}
                    onClick={() => setFinancialReportTab(i)}
                  />
                </div>
              ))}
            {isMobile && (
              <Dropdown
                backgroundColor="#91CB00"
                items={financialReports?.reports?.map(el => el.title)}
                setItem={i => setFinancialReportTab(i)}
              />
            )}
          </div>
          <ul className={styles.listContainer}>
            {financialReports?.reports[financialReportTab]?.list?.map((item, index) => (
              <li key={index}>
                <a href={item.pdf?.publicURL} target="_blank" rel="noreferrer noopener">
                  <span className="sr-only">{item.title}</span>
                </a>
                <ImageSvg src={item?.background} alt="color" className={styles.background} />
                <p>{item.title}</p>
                <svg
                  width="19"
                  height="29"
                  viewBox="0 0 19 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 27.8485L18 14.4243L1 1.00002"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.annualReportsSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{annualReports.header}</h2>
          </div>
        </div>
        <div className={styles.content}>
          <ul>
            {annualReports?.list?.map((item, index) => (
              <li key={index}>
                <a href={item.pdf?.publicURL} target="_blank" rel="noreferrer noopener">
                  <span className="sr-only">{item.year}</span>
                </a>
                <ImageSvg src={item?.background} alt="color" className={styles.background} />
                {item.year}
                <svg
                  width="31"
                  height="23"
                  viewBox="0 0 31 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 22H15L29.4278 22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1L15.2139 16L29.4278 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.documentsSection}`}>
        <ul>
          {documents?.map((item, index) => {
            const isDrhp = item.title === "DRHP Document"
            const isRhp = item.title === "RHP Document"
            const isProspective = item.title === "Prospectus Document"

            let link = null

            if (isDrhp || isRhp || isProspective) {
              link = (
                <button
                  onClick={isDrhp ? openDRHPModal : isRhp ? openRHPModal : openProspectiveModal}
                  className={styles.linkButton}
                >
                  View Report
                </button>
              )
            } else {
              link = (
                <a href={item.pdf?.publicURL} target="_blank" rel="noreferrer noopener">
                  View Report
                </a>
              )
            }

            return (
              <li key={index}>
                <h3 className="!max-w-[250px] !text-wrap">{item.title}</h3>
                <div>
                  {link}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="42"
                    viewBox="0 0 27 42"
                    fill="none"
                  >
                    <path
                      d="M1 40.4824L26 20.7409L1 0.999342"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </li>
            )
          })}
        </ul>
        <DRHPConfirmationModal isOpen={openModal.drhp} handleClose={closeDRHPModal} />
        <RHPConfirmationModal isOpen={openModal.rhp} handleClose={closeRHPModal} />
        <ProspectiveConfirmationModal
          isOpen={openModal.prospective}
          handleClose={closeProspectiveModal}
        />
      </section>
      <section className="custom-section-layout">
        <h3 className="font-semibold text-5xl !mb-20 max-w-[500px] text-wrap">
          {materials.header}
        </h3>
        <div onClick={() => openMCMDModal()}>
          <Accordion
            title={materials.contracts.header}
            isOpen={accordionState.isMaterialAccordionOpen}
            onOpen={toggleMaterialAccordion}
            className={accordionState.mcmdConfirmed ? "" : "pointer-events-none"}
          >
            <ul className="flex flex-col gap-5">
              {materials.contracts.list.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.pdf.publicURL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="!text-xl hover:!text-[#91CB00] !no-underline"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion
            title={materials.documents.header}
            isOpen={accordionState.isDocumentsAccordionOpen}
            onOpen={toggleDocumentsAccordion}
            className={accordionState.mcmdConfirmed ? "" : "pointer-events-none"}
          >
            <ul className="flex flex-col gap-5">
              {materials.documents.list.map((item, index) => (
                <li key={index}>
                  <a
                    href={item?.pdf?.publicURL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="!text-xl hover:!text-[#91CB00] !no-underline"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </Accordion>
        </div>
        <MCMDConfirmationModal isOpen={openModal.mcmd} handleClose={closeMCMDModal} />
      </section>
      <section className={`custom-section-layout ${styles.policiesSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{policies.header}</h2>
          </div>
        </div>
        <div className={styles.content}>
          <ul className={styles.listContainer}>
            {policies?.list?.map((item, index) => (
              <li key={index}>
                <a href={item.pdf?.publicURL} target="_blank" rel="noreferrer noopener">
                  <span className="sr-only">{item.title}</span>
                </a>
                <ImageSvg src={item?.background} alt="color" className={styles.background} />
                {item.title}
                <svg
                  width="31"
                  height="23"
                  viewBox="0 0 31 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 22H15L29.4278 22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1L15.2139 16L29.4278 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.governanceSection}`}>
        <Image src={governance?.background_image} alt="" className={styles.background} />
        <span className="header-text">{governance?.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{governance?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">{governance?.right_column?.description}</p>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.committeesSection}`}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{committees.header}</h2>
          </div>
        </div>
        <div className={styles.content}>
          {!isMobile && (
            <ul className={styles.tabsList}>
              {committees.list.map((el, i) => (
                <li key={i}>
                  <Button
                    color="#2590BE"
                    text={el.title}
                    active={committeeTab === i}
                    onClick={() => setCommitteeTab(i)}
                  />
                </li>
              ))}
            </ul>
          )}
          {isMobile && (
            <Dropdown
              backgroundColor="#2590BE"
              items={committees.list.map(el => el.title)}
              setItem={i => setCommitteeTab(i)}
            />
          )}
          <div className={styles.tabContent}>
            <div className={styles.tabHeader}>
              <h4>{committees.list[committeeTab]?.chairman?.title}</h4>
              <div>
                <Image
                  src={committees.list[committeeTab]?.chairman?.image}
                  alt={committees.list[committeeTab]?.chairman?.name}
                  className={styles.image}
                />
                <p>{committees.list[committeeTab]?.chairman?.name}</p>
              </div>
            </div>
            <div className={styles.tabBody}>
              <h4>Members:</h4>
              <ul>
                {committees.list[committeeTab]?.members?.map((member, index) => (
                  <li key={index}>
                    <div>
                      <Image src={member.image} alt={member.name} className={styles.image} />
                      <p>{member.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className={`custom-section-layout ${styles.contactSection}`}>
        <span className="header-text">{contact?.header}</span>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{contact?.left_column?.title}</h2>
          </div>
          <div className="right-column">
            <p className="section-column-description">{contact?.right_column?.description}</p>
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.left} />
          <div className={styles.right}>
            <div className={styles.investorsContact}>
              <h4>Investors Contact:</h4>
              <p>{contact.investors_contact.name}</p>
              <p>{contact.investors_contact.designation}</p>
              <a href={`mailto:${contact.investors_contact.email}`} target="_blank">
                {contact.investors_contact.email}
              </a>
            </div>
            <div className={styles.companyName}>
              <h4>{contact.details.company_name}</h4>
              <p>{contact.details.sub_text}</p>
            </div>
            <div className={styles.address}>
              <h4>Address:</h4>
              <p>{contact.details.address}</p>
            </div>
            <div>
              <h4>Telephone:</h4>
              <p>{contact.details.telephone}</p>
            </div>
            <div>
              <h4>Email:</h4>
              <p>{contact.details.email}</p>
            </div>
          </div>
        </div>
        {/* <BackToTop /> */}
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Investments" />

export const aboutPageQuery = graphql`
  query content {
    investments: investmentsJson {
      banner {
        background
        background_mobile
        heading
      }
      relations {
        header
        left_column {
          title
        }
        right_column {
          description
        }
        list {
          heading
          text
        }
      }
      case_study {
        header
        left_column {
          title
        }
        list {
          title
          description
        }
      }
      financial_reports {
        header
        left_column {
          title
        }
        right_column {
          description
        }
        reports {
          title
          list {
            title
            pdf {
              publicURL
            }
            background
          }
        }
      }
      annual_reports {
        header
        list {
          year
          pdf {
            publicURL
          }
          background
        }
      }
      documents {
        title
        pdf {
          publicURL
        }
      }
      materials {
        header
        contracts {
          header
          list {
            name
            pdf {
              publicURL
            }
          }
        }
        documents {
          header
          list {
            name
            pdf {
              publicURL
            }
          }
        }
      }
      policies {
        header
        list {
          title
          pdf {
            publicURL
          }
          background
        }
      }
      governance {
        background_image
        header
        left_column {
          title
        }
        right_column {
          description
        }
      }
      committees {
        header
        list {
          title
          chairman {
            title
            name
            image
          }
          members {
            name
            image
          }
        }
      }
      contact {
        header
        left_column {
          title
        }
        right_column {
          description
        }
        investors_contact {
          name
          designation
          email
        }
        details {
          company_name
          sub_text
          address
          telephone
          email
        }
      }
    }
  }
`

export default InvestmentsPage
