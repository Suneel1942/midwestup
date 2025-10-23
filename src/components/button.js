import * as React from "react"
import * as styles from "@styles/button.module.scss"

export function Button({ text, color, active, disabled, ...props }) {
  return (
    <button
      {...props}
      className={`${styles.customButton} ${active ? styles.active : ""} ${disabled ? "pointer-events-none opacity-50" : ""} ${props.className}`}
      disabled={disabled}
      style={{ "--button-hover-bg-color": color }}
    >
      {text}
    </button>
  )
}
