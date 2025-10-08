/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

import { ContactForm } from "./contact-form"
import BackToTop from "./back-to-top"
import { ImageSvg } from "./imageSvg"
import { TabletPopup } from "./tablet-popup"

import * as styles from "@styles/layout.module.scss"
import "@styles/global.scss"

const Layout = ({ children, footerDark }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      meta: site {
        siteMetadata {
          title
        }
      }
      site: siteJson {
        logo
        title
        menu {
          title
          link
          sub_links {
            title
            link
          }
        }
      }
    }
  `)

  const {
    meta: { siteMetadata },
    site: { logo, menu },
  } = data

  return (
    <>
      <Header
        siteTitle={siteMetadata?.title || `Midwest Group`}
        logo={logo ?? ""}
        navLinks={menu ?? []}
      />
      <div>
        <main>
          {children}
          <section
            className={`custom-section-layout ${styles.contactSection}`}
            id="home-contact-form"
          >
            <ImageSvg
              src="backgrounds/gray.svg"
              alt="gray background"
              className={styles.background}
            />
            <div>
              <span className="header-text" style={{ color: "white" }}>
                Contact Us
              </span>
              <div className="columns-container">
                <div className="left-column">
                  <h2 className="section-column-title">Get in touch</h2>
                </div>
                <div className="right-column">
                  <ContactForm />
                </div>
              </div>
            </div>
            <BackToTop />
          </section>
          {/* <TabletPopup /> */}
        </main>
        <Footer logo={logo ?? ""} menu={menu ?? []} background={footerDark} />
      </div>
    </>
  )
}

export default Layout
