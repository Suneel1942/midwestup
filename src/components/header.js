import React, { useState } from "react"
import { Link } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import { ImageSvg } from "@components/imageSvg"
import { MenuButton } from "./menu-button"
import { MenuDropdown } from "./menu-dropdown"
import { useHeaderScroll } from "@utils/useHeaderScroll"
import cln from "classnames"
import * as styles from "@styles/layout.module.scss"

const Header = ({ siteTitle, logo, navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { shouldHideHeader } = useHeaderScroll()
  const menuSlide = {
    initial: { x: "calc(100% + 200px)" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "calc(100% + 200px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  }
  function handleMenuClick() {
    setMenuOpen(!menuOpen)
    document.getElementsByTagName("html")[0].classList.toggle("no-scroll")
  }
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""

  // Dynamic header classes based on scroll state
  const headerClasses = cln(styles.header, "transition-all duration-400 ease-in-out", {
    "-translate-y-full": shouldHideHeader,
    "translate-y-0": !shouldHideHeader,
  })

  return (
    <header className={headerClasses}>
      <Link to="/" className={styles.headerLogo}>
        <ImageSvg src={logo} alt="MIDWEST" />
      </Link>
      <nav className={styles.desktopNav}>
        {navLinks?.map((item, index) => (
          <React.Fragment key={index}>
            {item.sub_links ? (
              <MenuDropdown
                title={item.title}
                items={item.sub_links}
                className="[&_p]:!text-base !mx-0"
              />
            ) : (
              <Link to={item.link} className={styles.navLink}>
                {item.title}
              </Link>
            )}
          </React.Fragment>
        ))}
        <Link to="/#home-contact-form" className={cln(styles.contactLink, "!py-3 !px-4")}>
          Contact
        </Link>
      </nav>
      <MenuButton onClick={handleMenuClick} menuOpen={menuOpen} />
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.mobileNav}
          >
            <div className={styles.header}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="40"
                viewBox="0 0 36 40"
                fill="none"
              >
                <path
                  d="M34.8906 12.026L27.5113 2.26234C26.6151 0.926144 25.1927 0.101765 23.6139 0.0079962C22.0389 -0.0857721 20.5325 0.558885 19.4914 1.77787L17.0774 4.60655L19.1367 7.05625L21.8444 3.88375C22.2448 3.41491 22.8092 3.16096 23.4346 3.20003C24.0448 3.23519 24.5901 3.55166 24.9372 4.06738L32.3164 13.831C32.652 14.335 32.7474 14.9562 32.5796 15.5423C32.4079 16.1244 31.9961 16.5933 31.4431 16.8238L28.4266 18.0897C27.6143 18.4296 26.6723 18.1717 26.1346 17.4606L14.4575 3.26645C13.4011 1.86773 11.7384 1.11368 10.0223 1.26215C8.30237 1.40671 6.78457 2.42253 5.96466 3.97752L1.9871 10.2795C0.953625 12.2409 1.2282 14.5772 2.67736 16.2338C4.13033 17.8904 6.36889 18.4218 8.38246 17.5778C9.11085 17.2731 9.7706 16.7886 10.2854 16.183L15.2583 11.3071L13.1723 8.87301L7.93246 14.0772C7.73415 14.3116 7.47864 14.4952 7.20025 14.6124C6.01804 15.1047 5.2172 14.3428 4.99982 14.0967C4.78245 13.8505 4.1227 12.9558 4.73287 11.8033L8.71043 5.50516C9.03077 4.89567 9.6028 4.51669 10.274 4.45808C10.3312 4.45418 10.3884 4.45027 10.4418 4.45027C11.0481 4.45027 11.6049 4.72767 11.9825 5.22777L23.652 19.4259C24.6359 20.7269 26.1423 21.4458 27.6829 21.4458C28.3274 21.4458 28.9757 21.3208 29.6012 21.059L32.6177 19.7931C34.0478 19.1953 35.1194 17.9803 35.5656 16.4643C36.008 14.9484 35.7601 13.3309 34.8868 12.026H34.8906Z"
                  fill="#91C83E"
                />
                <path
                  d="M0.892562 27.9745L8.27182 37.7381C9.16801 39.0743 10.5867 39.8948 12.1693 39.9925C13.7443 40.0862 15.2507 39.4416 16.2918 38.2226L18.7057 35.3939L16.6464 32.9442L13.9388 36.1167C13.5384 36.5856 12.974 36.8395 12.3485 36.8004C11.7384 36.7653 11.193 36.4488 10.846 35.9331L3.46672 26.1695C3.13113 25.6655 3.03579 25.0442 3.20359 24.4582C3.3752 23.876 3.78706 23.4072 4.34003 23.1767L7.35656 21.9108C8.16885 21.5709 9.1108 21.8288 9.64852 22.5398L21.318 36.7418C22.3744 38.1405 24.0371 38.8946 25.7532 38.7461C27.4731 38.6016 28.9909 37.5857 29.8109 36.0308L33.7884 29.7326C34.8219 27.7713 34.5473 25.4349 33.0982 23.7784C31.6452 22.1218 29.4066 21.5904 27.3931 22.4343C26.6647 22.7391 26.0049 23.2236 25.4901 23.8292L20.5172 28.7051L22.6032 31.1392L27.8431 25.935C28.0414 25.7006 28.2969 25.517 28.5753 25.3998C29.7575 24.9075 30.5583 25.6694 30.7757 25.9155C30.9931 26.1616 31.6528 27.0563 31.0426 28.2089L27.0651 34.507C26.7448 35.1165 26.1727 35.4955 25.5015 35.5541C25.4443 35.558 25.3871 35.5619 25.3337 35.5619C24.7274 35.5619 24.1706 35.2845 23.793 34.7844L12.1235 20.5863C11.1396 19.2853 9.63326 18.5664 8.09258 18.5664C7.44809 18.5664 6.79978 18.6914 6.17436 18.9532L3.15782 20.2191C1.72773 20.8168 0.656121 22.0319 0.209933 23.5478C-0.232441 25.0638 0.0154408 26.6813 0.888748 27.9862L0.892562 27.9745Z"
                  fill="#91C83E"
                />
              </svg>
            </div>
            <nav>
              {navLinks?.map((item, index) => (
                <React.Fragment key={index}>
                  {/* <pre>{JSON.stringify(item.sub_links?.find((subItem) => subItem.link === pathname))}</pre> */}
                  {item.sub_links ? (
                    <MenuDropdown
                      title={item.title}
                      items={item.sub_links}
                      path={item.sub_links.find(subItem => subItem.link === pathname)}
                    />
                  ) : (
                    <Link
                      to={item.link ?? "/"}
                      key={index}
                      onClick={handleMenuClick}
                      className={styles.navLink}
                      style={{ "--menu-item-line": pathname === item.link ? "underline" : "none" }}
                    >
                      {item.title}
                    </Link>
                  )}
                </React.Fragment>
              ))}
              <Link to="/#home-contact-form" className={styles.contactLink}>
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
