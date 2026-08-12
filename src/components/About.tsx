import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight, Trophy, Award, Maximize2, X } from 'lucide-react'
import { FadeIn, Stagger, fadeUpItem } from './AnimationUtils'
import styles from './About.module.css'

const STATS = [
  { value: '3+', label: 'года гостеприимства' },
  { value: '6', label: 'типов номеров' },
  { value: '24/7', label: 'работаем для вас' },
  { value: '100%', label: 'свежее бельё' },
]

const IMG = './gosti.webp'
const YANDEX_MAPS_URL = 'https://yandex.ru/maps/org/tirmen/241654012395/'

export default function About() {
  const [showDiplomaModal, setShowDiplomaModal] = useState(false)

  return (
    <>
      <section id="about" className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {/* Text */}
            <div className={styles.textCol}>
              <FadeIn>
                <p className={styles.eyebrow}>О нас</p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className={styles.title}>Практичность<br />и настоящее гостеприимство</h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className={styles.body}>
                  Гостиница «Тирмэн» — надёжное место для отдыха в дороге. Мы ценим ваше время и предлагаем качественное обслуживание при удобном расположении в селе Зирган Мелеузовского района.
                </p>
                <p className={styles.body} style={{ marginTop: 16 }}>
                  Наш приоритет — ваш спокойный сон и сытное питание. Оцените чистоту и тишину наших номеров, а также домашнюю кухню в нашей столовой.
                </p>
                <a href="#history" className={styles.link}>
                  История гостиницы
                  <ArrowRight size={14} strokeWidth={2.5} />
                </a>
              </FadeIn>

              {/* Stats */}
              <Stagger className={styles.statsGrid} staggerDelay={0.08}>
                {STATS.map(({ value, label }) => (
                  <motion.div key={label} className={styles.statCard} variants={fadeUpItem}>
                    <span className={styles.statValue}>{value}</span>
                    <span className={styles.statLabel}>{label}</span>
                  </motion.div>
                ))}
              </Stagger>
            </div>

            {/* Image */}
            <FadeIn direction="left" delay={0.15} className={styles.imgCol}>
              <motion.div
                className={styles.imgWrap}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={IMG} alt="Фасад гостиницы ТИРМЭН" className={styles.img} />
                <a 
                  href={YANDEX_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.badge}
                  style={{ textDecoration: 'none' }}
                >
                  <div className={styles.badgeIcon}>
                    <MapPin size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <div className={styles.badgeTitle}>с. Зирган, ул. Гагарина, 1</div>
                    <div className={styles.badgeSub}>Мелеузовский район, Башкортостан</div>
                  </div>
                </a>
              </motion.div>
            </FadeIn>
          </div>

          {/* Award Banner Block */}
          <FadeIn delay={0.25}>
            <div className={styles.awardCard}>
              <div className={styles.awardLeft}>
                <div className={styles.awardIconBadge}>
                  <Trophy size={20} strokeWidth={2} />
                </div>
                <div className={styles.awardInfo}>
                  <p className={styles.awardTag}>Признание и награды &bull; 2025</p>
                  <h3 className={styles.awardTitle}>
                    Победитель конкурса «Лучший объект придорожного сервиса Республики Башкортостан 2025»
                  </h3>
                  <p className={styles.awardDesc}>
                    Гостиница «Тирмэн» официально признана лучшим объектом придорожного сервиса. Награда подтверждает высокое качество обслуживания, идеальную чистоту и комфорт для всех автопутешественников и гостей региона.
                  </p>
                  <button 
                    type="button" 
                    className={styles.awardViewBtn}
                    onClick={() => setShowDiplomaModal(true)}
                  >
                    <Award size={15} strokeWidth={2} />
                    <span>Посмотреть официальный диплом</span>
                  </button>
                </div>
              </div>

              <div 
                className={styles.diplomaThumbCard}
                onClick={() => setShowDiplomaModal(true)}
                title="Нажмите, чтобы открыть диплом"
              >
                <img src="./diplom.jpg" alt="Диплом лучший объект придорожного сервиса РБ 2025" className={styles.diplomaImg} />
                <div className={styles.diplomaOverlay}>
                  <Maximize2 size={20} strokeWidth={2} />
                  <span>Открыть диплом</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Diploma Lightbox Modal */}
      <AnimatePresence>
        {showDiplomaModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDiplomaModal(false)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.modalCloseBtn}
                onClick={() => setShowDiplomaModal(false)}
                aria-label="Закрыть"
              >
                <X size={24} strokeWidth={2} />
              </button>
              <img 
                src="./diplom.jpg" 
                alt="Диплом лучший объект придорожного сервиса РБ 2025" 
                className={styles.modalImg} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
