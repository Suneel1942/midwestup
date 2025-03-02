import * as React from "react"
import { Link } from "gatsby"

export function KnowMoreLink({ text, href, ...props }) {
  return (
    <Link to={href} className={`know-more-link ${props.classnames}`} {...props}>
      {text}
      <svg width="27" height="47" viewBox="0 0 27 47" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 46L26 23.5L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )
}
