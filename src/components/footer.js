import * as React from "react"
import { Link } from "gatsby"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "@styles/layout.module.scss"

const Footer = ({ logo, menu, background }) => {
  return (
    <>
      <footer style={{ background: background ? "#D9D9D9" : "" }}>
        <div className={styles.footer}>
        <div className={styles.leftContent}>
          <h3>Menu</h3>
          <ul>
            {menu?.map((item, index) => (
              <li key={index}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.rightContent}>
          <h3>Contact Us</h3>
          <ul>
            <li>
              <strong>Regd Office:</strong>#8-2-684/3/25&26, Road No.12, Banjara Hills, Hyderabad - 500034, Telangana, India.
            </li>
            <li>
              <strong>Telephone:</strong>040-23305193/94/95
            </li>
            <li>
              <strong>Email:</strong>info@midwest.in
            </li>
          </ul>
        </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
