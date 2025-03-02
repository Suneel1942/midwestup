import React, { useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useOnClickOutside } from "@utils/useOnClickOutside";

import * as styles from "@styles/dropdown.module.scss";

export const Dropdown = ({ items, backgroundColor, setItem }) => {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState(items[0]);
  // const [titleHovered, setTitleHovered] = useState(false);
  // const [curIndex, setCurIndex] = useState(-1);
  const dropdown = useRef(null);
  const dropdownContainer = useRef(null);
  
  useOnClickOutside(dropdownContainer, () => {
    setClicked(false);
  });

  const spring = useSpring(0);

  const options = items.map((item, index) => {
    return (
      <motion.li
        key={`option-${index + 1}`}
        // animate={
        //   curIndex === index
        //     ? { backgroundColor: "#f0f0f0" }
        //     : { backgroundColor: "#ffffff" }
        // }
        // whileTap={{ backgroundColor: "#f0f0f0" }}
        // onHoverStart={() => setCurIndex(index)}
        // onHoverEnd={() => setCurIndex(-1)}
        // noBorder={index === items.length - 1}
        onClick={() => {
          setClicked(false);
          setTitle(item);
          setItem(index)
        }}
      >
        {item}
      </motion.li>
    );
  });

  return (
    <div
      ref={dropdownContainer}
      className={styles.dropdownContainer}
      style={{ "--dropdown-bg-color": backgroundColor }}
    >
      <div
        ref={dropdown}
        type="button"
        onClick={() => setClicked(!clicked)}
        // onHoverStart={() => setTitleHovered(true)}
        // onHoverEnd={() => setTitleHovered(false)}
        className={styles.titleContainer}
      >
        <p>{title}</p>
        <motion.svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none" animate={clicked ? { rotateZ: 180 } : { rotateZ: 0 }}>
          <path d="M1.5 1.5L7 8.5L12.5 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
        </motion.svg>
      </div>
      <div style={{ position: "relative", width: "100%" }}>
        <motion.ul
          initial={{ height: 0 }}
          animate={
            clicked
              ? {
                  height: "auto",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                }
              : {
                  height: 0,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: { type: spring },
                }
          }
          className={styles.optionsContainer}
        >
          {options}
        </motion.ul>
      </div>
    </div>
  );
};
