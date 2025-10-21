import React, { useState, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Create context for accordion group
const AccordionContext = createContext()

const Accordion = ({
  title,
  children,
  isOpen,
  onOpen,
  className = "",
  titleClassName = "",
  contentClassName = "",
  iconClassName = "",
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Accordion Header */}
      <button
        onClick={onOpen}
        className={`
          w-full !p-4 text-left bg-[#4E4E4E] !text-white cursor-pointer text-2xl font-semibold transition-colors duration-200 flex items-center justify-between
          ${titleClassName}
        `}
        aria-expanded={isOpen}
      >
        <span className="pr-4">{title || "Accordion"}</span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-shrink-0 ${iconClassName}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white transition-colors duration-200"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`accordion-content-${title ? title.replace(/\s+/g, "-").toLowerCase() : "accordion"}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div
              id={`accordion-content-${title ? title.replace(/\s+/g, "-").toLowerCase() : "accordion"}`}
              className={`
                !py-[30px]
                ${contentClassName}
              `}
            >
              {children || null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
