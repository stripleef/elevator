import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { FadeIn } from './AnimationUtils'
import styles from './CtaBanner.module.css'

const PHONE_NUMBER = '+7 (917) 447-55-41'
const PHONE_HREF = 'tel:+79174475541'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function CallDropdown({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <motion.div
      ref={ref}
      className={styles.callDropdown}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <p className={styles.callDropdownText}>
        Позвоните по этому номеру для бронирования и уточнения всех деталей:
      </p>
      <a href={PHONE_HREF} className={styles.callDropdownPhone}>
        <Phone size={16} strokeWidth={2} />
        {PHONE_NUMBER}
      </a>
    </motion.div>
  )
}

export default function CtaBanner() {
  const [showCall, setShowCall] = useState(false)
  const isMobile = useIsMobile()

  const handleCallClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault()
      setShowCall(prev => !prev)
    }
  }

  return (
    <section className={styles.section} aria-label="Бронирование">
      <div className="container">
        <FadeIn>
          <div className={styles.card}>
            {/* Decorative circles */}
            <div className={styles.circle1} />
            <div className={styles.circle2} />

            <div className={styles.text}>
              <h2 className={styles.title}>Готовы забронировать номер?</h2>
              <p className={styles.subtitle}>
                Позвоните нам или напишите в WhatsApp — подберём подходящий вариант и подтвердим бронь.
              </p>
            </div>

            <div className={styles.actions}>
              <div className={styles.phoneBtnWrap}>
                <motion.a
                  href={PHONE_HREF}
                  onClick={handleCallClick}
                  className={styles.btnPrimary}
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 32px rgba(255,255,255,0.18)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Phone size={16} strokeWidth={2.5} />
                  Позвонить сейчас
                </motion.a>
                <AnimatePresence>
                  {showCall && <CallDropdown onClose={() => setShowCall(false)} />}
                </AnimatePresence>
              </div>
              <motion.a
                href="https://wa.me/79174475541"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
                whileHover={{ background: 'rgba(255,255,255,0.14)' }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={16} strokeWidth={2} />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
