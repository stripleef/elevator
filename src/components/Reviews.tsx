import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { FadeIn } from './AnimationUtils'
import styles from './Reviews.module.css'

const REVIEWS = [
  {
    id: 1,
    name: 'Анна С.',
    date: 'Июнь 2024',
    rating: 5,
    text: '«Отличное место для ночёвки в дороге. Очень чисто, кровати удобные, выспались прекрасно. Еда в столовой простая, но действительно вкусная и домашняя.»',
    initial: 'А',
  },
  {
    id: 2,
    name: 'Михаил В.',
    date: 'Август 2024',
    rating: 4.5,
    text: '«Останавливались во время деловой поездки. Удобно расположено. В номерах тихо — что самое главное после долгого дня за рулём.»',
    initial: 'М',
  },
  {
    id: 3,
    name: 'Семья Ивановых',
    date: 'Сентябрь 2024',
    rating: 5,
    text: '«Приветливый персонал, встретили тепло. Парковка прямо у входа — очень удобно. Обязательно вернёмся при следующей поездке в Башкортостан.»',
    initial: 'И',
  },
  {
    id: 4,
    name: 'Дмитрий К.',
    date: 'Октябрь 2024',
    rating: 5,
    text: '«Отличная гостиница на трассе. Цены разумные, персонал внимательный. Завтрак очень понравился — всё свежее, большие порции.»',
    initial: 'Д',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={16}
          strokeWidth={1.5}
          className={i <= Math.floor(rating) ? styles.starFilled : styles.starEmpty}
          fill={i <= Math.floor(rating) ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  )
}

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const visible = [0, 1, 2].map(i => REVIEWS[(current + i) % REVIEWS.length])

  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <FadeIn><p className={styles.eyebrow}>Отзывы</p></FadeIn>
            <FadeIn delay={0.1}><h2 className={styles.title}>Что говорят гости</h2></FadeIn>
          </div>
          {/* Navigation */}
          <FadeIn delay={0.15} direction="right">
            <div className={styles.navButtons}>
              <button
                className={styles.navBtn}
                onClick={() => setCurrent(v => (v - 1 + REVIEWS.length) % REVIEWS.length)}
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
              <button
                className={styles.navBtn}
                onClick={() => setCurrent(v => (v + 1) % REVIEWS.length)}
                aria-label="Следующий отзыв"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            </div>
          </FadeIn>
        </div>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {visible.map((review, i) => (
              <motion.div
                key={review.id}
                className={`${styles.card} ${i === 0 ? styles.cardHighlight : ''}`}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                layout
              >
                <Quote size={28} strokeWidth={1.5} className={styles.quoteIcon} />
                <Stars rating={review.rating} />
                <p className={styles.text}>{review.text}</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{review.initial}</div>
                  <div>
                    <div className={styles.name}>{review.name}</div>
                    <div className={styles.meta}>{review.date}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
