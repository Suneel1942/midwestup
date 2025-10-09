import React, { useState, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Create context for accordion group
const AccordionContext = createContext()

const Accordion = ({
  title,
  children,
  defaultOpen = false,
  className = "",
  titleClassName = "",
  contentClassName = "",
  iconClassName = "",
  index,
}) => {
  const context = useContext(AccordionContext)
  const [isOpen, setIsOpen] = useState(defaultOpen)

  // Use group context if available, otherwise use local state
  const isAccordionOpen = context ? context.openIndex === index : isOpen

  const toggleAccordion = () => {
    if (context) {
      // If in a group, use group's toggle function
      context.toggleAccordion(index)
    } else {
      // If standalone, use local state
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Accordion Header */}
      <button
        onClick={toggleAccordion}
        className={`
          w-full !p-4 text-left bg-[#4E4E4E] !text-white cursor-pointer text-2xl font-semibold transition-colors duration-200 flex items-center justify-between
          ${titleClassName}
        `}
        aria-expanded={isAccordionOpen}
      >
        <span className="pr-4">{title || "Accordion"}</span>

        <motion.div
          animate={{ rotate: isAccordionOpen ? 180 : 0 }}
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
        {isAccordionOpen && (
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

// Accordion Group Component for multiple accordions
export const AccordionGroup = ({
  children,
  className = "",
  allowMultiple = false,
  defaultOpenIndex = null,
}) => {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  const toggleAccordion = index => {
    if (allowMultiple) {
      // If multiple allowed, toggle individual accordions
      setOpenIndex(openIndex === index ? null : index)
    } else {
      // If only one allowed, close others when opening a new one
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  const contextValue = {
    openIndex,
    toggleAccordion,
    allowMultiple,
  }

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={`space-y-2 ${className}`}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index })
          }
          return child
        })}
      </div>
    </AccordionContext.Provider>
  )
}

export default Accordion
