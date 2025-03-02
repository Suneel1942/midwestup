import React from "react";
import { ImageSvg } from "@components/imageSvg"

import * as styles from "@styles/materials.module.scss";

export const NaturalStoneStrength = ({ data, isMobile }) => {
  return (
    <section className={`custom-section-layout ${styles.naturalStoneStrengthSection}`}>
      {/* <ImageSvg src="backgrounds/gray.svg" alt="gray background" className={styles.background} /> */}
      <div className={styles.sectionWrapper}>
        <div className="columns-container">
          <div className="left-column">
            <h2 className="section-column-title">{data?.title}</h2>
          </div>
          <div className={`right-column ${styles.rightColumn}`}>
            <div className={styles.contentOne}>
              <p>{data?.right_column?.content_one?.description}</p>
              <hr />
              <ImageSvg
                src={isMobile ? data?.right_column?.content_one?.image_mobile : data?.right_column?.content_one?.image}
                alt="diagram 1"
              />
            </div>
            <div className={styles.contentTwo}>
              <p>{data?.right_column?.content_two?.description}</p>
              <hr />
              <ImageSvg
                src={isMobile ? data?.right_column?.content_two?.image_mobile : data?.right_column?.content_two?.image}
                alt="diagram 2"
              />
            </div>
            <div className={styles.tableContainer}>
              <div className={styles.contentTwo}>
                <p>{data?.right_column?.table?.title}</p>
              </div>
              <br></br>
              <div className={styles.tableWrapper}>
                <table>

                  <thead>
                    <tr>
                      {data?.right_column?.table?.cell_header?.map((el, i) => (
                        <th key={i}>{el}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.right_column?.table?.cell_body?.map((el, i) => (
                      <tr key={i}>
                        {el?.map((elem, i) => (
                          <td key={i}>{elem}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
