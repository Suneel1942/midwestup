import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const Image = ({ src, alt, ...props }) => {
  const {
    allFile: { nodes: images },
  } = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)|(webp)/" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              quality: 100
              breakpoints: [750, 1080, 1366, 1920]
            )
          }
        }
      }
    }
  `)

  const image = images.find(node => node.relativePath === src)

  // console.log('imageimageimageimage', image)
  const imageData = getImage(image)

  return (
    <GatsbyImage
      image={imageData}
      alt={alt}
      {...props}
      imgStyle={{
        objectFit: "cover",
        objectPosition: "center center",
        width: "100%",
        height: "100%",
      }}
    />
  )
}
