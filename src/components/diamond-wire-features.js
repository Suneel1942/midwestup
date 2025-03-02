import React from "react";
import { ImageSvg } from "@components/imageSvg";

import * as styles from "@styles/materials.module.scss";

export const DiamondWireFeatures = ({ data }) => {
  return (
    <section className={`custom-section-layout ${styles.diamondWireFeaturesSection}`}>
      <div className="columns-container">
        <div className={`left-column ${styles.leftColumn}`}>
          <h2 className="section-column-title">{data?.heading}</h2>
        </div>
        <div className={`right-column ${styles.rightColumn}`}>
          <ul>
            {data?.list?.map((el,i) => (
              <li key={i} className={styles.card}>
                <h4>{el?.title}</h4>
                <p>{el?.text}</p>
                <ImageSvg src={el?.background} alt="" className={styles.background} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
