import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import styles from './Hero.module.css'

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

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoRefMobileBg = useRef<HTMLVideoElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showCall, setShowCall] = useState(false)
  const isMobile = useIsMobile()
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 180])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85 // slow down slightly
    }
    if (videoRefMobileBg.current) {
      videoRefMobileBg.current.playbackRate = 0.85
    }
  }, [])

  const handlePhoneClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault()
      setShowCall(prev => !prev)
    }
  }

  // Staggered text animations
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  }
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <section id="home" className={styles.hero} ref={containerRef} aria-label="Главный баннер">
      {/* Parallax background video */}
      <motion.div className={styles.videoWrapper} style={{ y: bgY }}>
        <video
          ref={videoRefMobileBg}
          src="./hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className={styles.videoBgBlur}
        />
        <video
          ref={videoRef}
          src="./hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className={styles.videoBg}
          onEnded={() => setVideoEnded(true)}
        />
        <div className={`${styles.blackScreen} ${videoEnded ? styles.blackScreenActive : ''}`} />
      </motion.div>

      {/* Overlay gradient layers */}
      <div className={styles.overlay} />
      <div className={styles.overlayGrain} />

      {/* Content */}
      <motion.div className={styles.content} style={{ opacity }}>
        <motion.div
          className={styles.contentInner}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div className={styles.eyebrow} variants={item}>
            <span className={styles.eyebrowLine} />
            <span>Гостиница в Башкортостане</span>
            <span className={styles.eyebrowLine} />
          </motion.div>

          {/* Title */}
          <motion.h1 className={styles.title} variants={item}>
            Добро пожаловать<br />
            <em>в ТИРМЭН</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p className={styles.subtitle} variants={item}>
            Уютные номера, домашняя еда и бесплатная парковка — идеальный отдых в пути.<br />
            с. Зирган, Мелеузовский район, Республика Башкортостан
          </motion.p>

          {/* Actions */}
          <motion.div className={styles.actions} variants={item}>
            <motion.a
              href="#rooms"
              className={styles.btnPrimary}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 36px rgba(6,27,14,0.45)' }}
              whileTap={{ scale: 0.97 }}
            >
              Смотреть номера
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.a>
            <div className={styles.phoneBtnWrap}>
              <motion.a
                href={PHONE_HREF}
                onClick={handlePhoneClick}
                className={styles.btnSecondary}
                whileHover={{ background: 'rgba(255,255,255,0.22)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={16} strokeWidth={2} />
                Позвонить
              </motion.a>
              <AnimatePresence>
                {showCall && <CallDropdown onClose={() => setShowCall(false)} />}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div className={styles.stats} variants={item}>
            {[
              { value: '3+', label: 'года работы' },
              { value: '6', label: 'типов номеров' },
              { value: '24/7', label: 'открыто' },
            ].map(({ value, label }) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
