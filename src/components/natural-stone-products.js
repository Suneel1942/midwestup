import React from "react";
import { Button } from "@components/button";
import { Image } from "@components/Image"

import * as styles from "@styles/materials.module.scss"

export const NaturalStoneProducts = ({ products, tab, setTab }) => {
  return (
    <section className={`custom-section-layout ${styles.naturalStoneProductsSection}`}>
      <div className="columns-container">
        <div className="left-column">
          <h2 className="section-column-title">{products?.heading}</h2>
          <div className={styles.buttonsContainer}>
            {products?.list?.map((el, i) => (
              <Button
                key={i}
                text={el.title}
                color="#2590BE"
                active={tab === i}
                onClick={() => setTab(i)}
              />
            ))}
          </div>
        </div>
        <div className={`right-column ${styles.rightColumn}`}>
          <Image src={products?.list[tab]?.image} alt={products?.list[tab]?.title} className={styles.productImage} />
          <ul className={styles.productDetailsList}>
            {products?.list[tab]?.details?.list?.map((el,i) => (
              el.text ? (
                <li><b>{el.title}:</b> {el.text}</li>
              ) : (
                <li key={i}>
                  <strong>{el.title}:</strong>
                  <ul className={styles.subList}>
                    {el.text_array?.map((text, i) => (
                      <li key={i}>{text}</li>
                    ))}
                  </ul>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
