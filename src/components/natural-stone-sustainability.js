import React from "react";
import { Button } from "@components/button";
import { Image } from "@components/Image";
import { ImageSvg } from "@components/imageSvg";

import * as styles from "@styles/materials.module.scss";

export const NaturalStoneSustainability = ({ data }) => {
  const [tab, setTab] = React.useState(0);
  return (
    <section className={`custom-section-layout ${styles.naturalStoneSustainabilitySection}`}>
      <div className="columns-container">
        <div className="left-column">
          <h2 className="section-column-title">{data?.heading}</h2>
          <div className={styles.buttonsContainer}>
            {data?.list?.map((el, i) => (
              <Button
                key={i}
                text={el.title}
                color="#91CB00"
                active={tab === i}
                onClick={() => setTab(i)}
              />
            ))}
          </div>
        </div>
        <div className={`right-column ${styles.rightColumn}`}>
          <ul>
            {data?.list[tab]?.content?.map((el,i) => (
              <>
              {el?.text && (
                <li key={i} className={styles.card}>
                  {el?.text}
                  <ImageSvg src={el?.background} alt="" className={styles.background} />
                </li>
              )}
              {el.image && (
                <li
                  key={i}
                  className={styles.imageContainer}
                  style={{
                    "--span": data.list[tab].content.length < 3 ? "span 2" : "" 
                  }}
                >
                  <Image src={el.image} alt="" className={styles.image} />
                </li>
              )}
              </>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
