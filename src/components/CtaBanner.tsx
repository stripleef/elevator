import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { FadeIn } from './AnimationUtils'
import styles from './CtaBanner.module.css'

export default function CtaBanner() {
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
              <motion.a
                href="tel:+79876037943"
                className={styles.btnPrimary}
                whileHover={{ scale: 1.03, boxShadow: '0 12px 32px rgba(255,255,255,0.18)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={16} strokeWidth={2.5} />
                Позвонить сейчас
              </motion.a>
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
