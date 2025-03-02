import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export const ImageSvg = ({ src, alt, ...props }) => {
  const { allFile: { nodes: images }} = useStaticQuery(graphql`
    query {
      allFile (filter: { extension: { eq: "svg" }}) {
        nodes {
          relativePath
          publicURL
        }
      }
    }
  `)

  const image = images.find(node => node.relativePath === src)
  return <img src={image?.publicURL} alt={alt} {...props} />
}
