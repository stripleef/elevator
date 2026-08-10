import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import styles from './Header.module.css'

const NAV = [
  { href: '#about', label: 'О гостинице' },
  { href: '#rooms', label: 'Номера' },
  { href: '#services', label: 'Услуги' },
  { href: '#history', label: 'История' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      
      // Hide when scrolling down, show when scrolling up
      if (y > lastY + 8 && y > 150) {
        setHidden(true)
      } else if (y < lastY - 8) {
        setHidden(false)
      }
      
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive('#' + e.target.id)),
      { threshold: 0.4 }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      {/* Invisible zone at the top to reveal header on hover */}
      {hidden && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '40px', zIndex: 999 }}
          onMouseEnter={() => setHidden(false)}
        />
      )}

      <motion.header
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        onMouseLeave={() => {
          if (window.scrollY > 150) setHidden(true)
        }}
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <a href="#" className={styles.logo} id="logo-link">
            <img src="./logo.png" alt="Логотип ТИРМЭН" className={styles.logoImg} />
            <span>ТИРМЭН</span>
          </a>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Навигация">
            {NAV.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`${styles.navLink} ${active === href ? styles.navLinkActive : ''}`}
              >
                {label}
                {active === href && (
                  <motion.span
                    className={styles.navUnderline}
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a href="tel:+79876037943" className={styles.callBtn}>
            <Phone size={14} strokeWidth={2.5} />
            <span>Позвонить</span>
          </a>

          {/* Burger */}
          <button
            className={styles.burger}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            >
              <div className={styles.mobileMenuHeader}>
                <div className={styles.logo}>
                  <img src="./logo.png" alt="Логотип ТИРМЭН" className={styles.logoImg} />
                  <span>ТИРМЭН</span>
                </div>
                <button onClick={closeMobile} className={styles.burger} aria-label="Закрыть">
                  <X size={22} />
                </button>
              </div>
              <nav>
                {NAV.map(({ href, label }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    className={styles.mobileNavLink}
                    onClick={closeMobile}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>
              <motion.a
                href="tel:+79876037943"
                className={styles.mobileCallBtn}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                onClick={closeMobile}
              >
                <Phone size={16} />
                +7 (987) 603-79-43
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
