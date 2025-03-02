import React, { useState, useEffect } from "react";
import { Modal } from 'react-responsive-modal';
import { useWindowSize } from "@utils/useWindowSize"

import 'react-responsive-modal/styles.css';

export const TabletPopup = () => {
  const [isOpen, setOpen] = useState(true)
  const { width } = useWindowSize()
  const [isTablet, setTablet] = useState(width > 767 && width < 1025)

  useEffect(() => {
    function resize() {
      setTablet(width > 767 && width < 1025)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  },[width])

  if (!isTablet) return null

  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen(false)}
      styles={{
        modalContainer: {
          display: "flex"
        },
        modal: {
          alignSelf: "center"
        }
      }}
    >
      <div className="tablet-popup-container">
        <div className="tablet-popup-text">
          <p>This website is best experienced on mobile or desktop and may not be fully optimized for this screen.</p>
        </div>
        <div className="tablet-popup-buttons-container">
          <button className="exit-button" onClick={() => setOpen(false)}>Exit</button>
          <button className="continue-button" onClick={() => setOpen(false)}>Continue Browsing</button>
        </div>
      </div>
    </Modal>
  )
}
