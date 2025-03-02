import * as React from "react"
import * as styles from "@styles/button.module.scss"

export function Button({ text, color, active, ...props }) {
  return (
    <button
      {...props}
      className={`${styles.customButton} ${active ? styles.active : ""}`}
      style={{ '--button-hover-bg-color': color }}
    >
      {text}
    </button>
  )
}
