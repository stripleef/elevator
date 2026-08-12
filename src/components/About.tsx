import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { FadeIn, Stagger, fadeUpItem } from './AnimationUtils'
import styles from './About.module.css'

const STATS = [
  { value: '10+', label: 'лет гостеприимства' },
  { value: '6', label: 'типов номеров' },
  { value: '24/7', label: 'работаем для вас' },
  { value: '100%', label: 'свежее бельё' },
]

const IMG = './gosti.webp'
const YANDEX_MAPS_URL = 'https://yandex.ru/maps/?ll=55.913254%2C53.237960&mode=poi&poi%5Bpoint%5D=55.912204%2C53.238335&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D241654012395&z=19.03'

export default function About() {
  return (
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
      </div>
    </section>
  )
}
