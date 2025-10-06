import React, { useState, useRef, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { motion, useSpring, AnimatePresence } from "framer-motion"
import { useOnClickOutside } from "@utils/useOnClickOutside"
import { useWindowSize } from "@utils/useWindowSize"
import cln from "classnames"
import * as styles from "@styles/dropdown.module.scss"

const DropdownContainer = ({ isMobile, open, transitionType, children }) => {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2, type: transitionType }}
        className={styles.optionsContainer}
      >
        <ul>{children}</ul>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: open ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      exit={{ opacity: 0, y: 10 }}
      style={{ translateX: "-50%" }}
      transition={{ duration: 0.2, type: transitionType }}
      className={styles.optionsContainer}
    >
      <div className={styles.spacing} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          boxShadow: open ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        className={styles.arrow}
      />
      <ul>{children}</ul>
    </motion.div>
  )
}

export const MenuDropdown = ({ title, items, path, className }) => {
  const [open, setOpen] = useState(false)
  const [titleHovered, setTitleHovered] = useState(false)
  const [curIndex, setCurIndex] = useState(-1)
  const dropdownContainer = useRef(null)

  const { width } = useWindowSize()
  const [isMobile, setMobile] = useState(width < 1181)

  useEffect(() => {
    function resize() {
      setMobile(width < 1181)
    }
    resize()
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [width])

  useOnClickOutside(dropdownContainer, () => {
    setOpen(false)
  })

  const spring = useSpring(0)

  const options = items.map((item, index) => {
    function handleLink(e) {
      e.preventDefault()
      navigate(item.link)
      document.getElementsByTagName("html")[0].classList.toggle("no-scroll")
    }
    return (
      <motion.li
        key={`option-${index + 1}`}
        animate={
          curIndex === index ? { backgroundColor: "#f0f0f0" } : { backgroundColor: "#ffffff" }
        }
        whileTap={{ backgroundColor: "#f0f0f0" }}
        onHoverStart={() => setCurIndex(index)}
        onHoverEnd={() => setCurIndex(-1)}
        noBorder={index === items.length - 1}
        style={{ "--menu-item-line": path?.link === item.link ? "underline" : "none" }}
      >
        {item.title}
        {isMobile ? <a onClick={handleLink} /> : <Link to={item.link} />}
      </motion.li>
    )
  })

  return (
    <div
      ref={dropdownContainer}
      onClick={() => setOpen(!open)}
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cln(styles.menuDropdownContainer, className)}
    >
      <div
        type="button"
        onHoverStart={() => setTitleHovered(true)}
        onHoverEnd={() => setTitleHovered(false)}
        className={styles.titleContainer}
        style={{ "--menu-item-line": path ? "underline" : "none" }}
      >
        <p>{title}</p>
        {isMobile && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            animate={open ? { rotateZ: 180 } : { rotateZ: 0 }}
          >
            <path
              d="M1.5 1.5L7 8.5L12.5 1.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <DropdownContainer isMobile={isMobile} open={open} transitionType={spring}>
            {options}
          </DropdownContainer>
        )}
      </AnimatePresence>
    </div>
  )
}
