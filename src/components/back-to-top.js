import React from "react";

import * as styles from "@styles/layout.module.scss"

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  return (
    <div className={styles.backToTop}>
      <button onClick={scrollToTop} aria-label="Back to top">
        <svg width="49" height="28" viewBox="0 0 49 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47 26L24.5 1L2 26" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
