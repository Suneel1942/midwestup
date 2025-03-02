import React from "react";
import { Button } from "@components/button";
import { Image } from "@components/Image"

import * as styles from "@styles/materials.module.scss"

export const DiamondWireProducts = ({ products }) => {
  const [tab, setTab] = React.useState(0)
  return (
    <section className={`custom-section-layout ${styles.diamondWireProductsSection}`}>
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
          <p>{products?.list[tab]?.details?.description}</p>
        </div>
      </div>
    </section>
  )
}
