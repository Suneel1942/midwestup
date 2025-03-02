import React from "react";
import { motion } from "framer-motion";

export const MenuButton = ({ menuOpen, ...props }) => {
  const icon = {
    initial: {
        rotate: 0
    },
    enter: {
        rotate: 45,
        transition: {duration: 1, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
        rotate: 0,
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}
    }
  }
  return (
    <button
      className="hamburger"
      type="button"
      {...props}
    >
      <span className="hamburger-box">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          variants={icon}
          initial="initial"
          animate={menuOpen ? "enter" : "exit"}
        >
          <path d="M12 22.9999V1" stroke="#91CB00" strokeWidth="2" strokeLinecap="round"/>
          <path d="M22.9999 12H1" stroke="#91CB00" strokeWidth="2" strokeLinecap="round"/>
        </motion.svg>
      </span>
    </button>
  );
};
