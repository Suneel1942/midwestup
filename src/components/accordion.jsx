import React from "react"
import { motion, AnimatePresence } from "framer-motion"

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
          w-full !p-4 text-left !text-black border-b border-black cursor-pointer text-2xl font-semibold transition-colors duration-200 flex items-center justify-between
          ${titleClassName}
        `}
        aria-expanded={isOpen}
      >
        <span className="pr-4">{title || "Accordion"}</span>

        <motion.div
          className={`flex-shrink-0 ${iconClassName}`}
          style={{ position: "relative", width: "24px", height: "24px" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors duration-200"
            style={{ position: "absolute", inset: 0 }}
          >
            {/* Horizontal line (always visible) */}
            <motion.path
              d="M6 12H18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={{
                opacity: 1,
              }}
            />
            {/* Vertical line (animates in/out) */}
            <motion.path
              d="M12 6V18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={{
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
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
            style={{ overflowAnchor: "none" }}
          >
            <div
              id={`accordion-content-${title ? title.replace(/\s+/g, "-").toLowerCase() : "accordion"}`}
              className={`py-[30px]
                ${contentClassName}
              `}
              style={{ overflowAnchor: "none" }}
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
