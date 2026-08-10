import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import styles from './Hero.module.css'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], [0, 180])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85 // slow down slightly
    }
  }, [])

  // Staggered text animations
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
  }
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section id="home" className={styles.hero} ref={containerRef} aria-label="Главный баннер">
      {/* Parallax background video */}
      <motion.div className={styles.videoWrapper} style={{ y: bgY }}>
        <video
          ref={videoRef}
          src="/hero-video.mov"
          autoPlay
          muted
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
            <motion.a
              href="tel:+79876037943"
              className={styles.btnSecondary}
              whileHover={{ background: 'rgba(255,255,255,0.22)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone size={16} strokeWidth={2} />
              +7 (987) 603-79-43
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div className={styles.stats} variants={item}>
            {[
              { value: '10+', label: 'лет работы' },
              { value: '3', label: 'типа номеров' },
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

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>листать</span>
      </motion.div>
    </section>
  )
}
