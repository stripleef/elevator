import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react'
import { FadeIn } from './AnimationUtils'
import styles from './Reviews.module.css'

const YANDEX_REVIEWS_URL = 'https://yandex.ru/maps/org/tirmen/241654012395/reviews/'

const REVIEWS = [
  {
    id: 1,
    name: 'Ильдар Х.',
    date: 'Отзыв с Яндекс Карт',
    rating: 5,
    text: '«Останавливались по пути в Уфу. Гостиница очень порадовала: номера чистые, бельё свежее, вежливый и отзывчивый персонал. Рядом замечательная столовая, еда домашняя и очень вкусная. Отличное место для отдыха с дороги!»',
    initial: 'И',
  },
  {
    id: 2,
    name: 'Екатерина М.',
    date: 'Отзыв с Яндекс Карт',
    rating: 5,
    text: '«Замечательный отель! Очень чисто, уютно, в номере есть всё необходимое: кондиционер, ТВ, удобные кровати. Приятно удивлены ценами и качеством обслуживания. Обязательно остановимся здесь снова!»',
    initial: 'Е',
  },
  {
    id: 3,
    name: 'Руслан Г.',
    date: 'Отзыв с Яндекс Карт',
    rating: 5,
    text: '«Отличное место! Ночевали с семьёй во время автопутешествия. Тишина, выспались идеально. В номере был свой душ и санузел, кондиционер работает отлично. Персоналу огромное спасибо за тёплый приём!»',
    initial: 'Р',
  },
  {
    id: 4,
    name: 'Вадим С.',
    date: 'Отзыв с Яндекс Карт',
    rating: 5,
    text: '«Езжу по работе часто, теперь буду останавливаться только в "Тирмэн". Заселили быстро, парковка удобная прямо у входа. В номере идеальная чистота и порядок. Рекомендую всем водителям и путешественникам!»',
    initial: 'В',
  },
  {
    id: 5,
    name: 'Ольга и Сергей',
    date: 'Отзыв с Яндекс Карт',
    rating: 5,
    text: '«Очень уютная и чистая гостиница в Зиргане! Просторные номера, новая мебель, свежее бельё. Отдельный плюс — сауна и уютная домашняя атмосфера. Оценка 5 из 5!»',
    initial: 'О',
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
            <FadeIn><p className={styles.eyebrow}>Отзывы наших гостей</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className={styles.title}>Что говорят о гостинице «Тирмэн»</h2>
            </FadeIn>
          </div>
          {/* Navigation & Link */}
          <FadeIn delay={0.15} direction="right">
            <div className={styles.headerActions}>
              <a
                href={YANDEX_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.yandexLinkBtn}
              >
                <Star size={15} fill="#ffcc00" color="#ffcc00" />
                <span>4.7 на Яндекс Картах</span>
                <ExternalLink size={14} strokeWidth={2} />
              </a>
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

        {/* Bottom actions: Dots + Yandex link */}
        <div className={styles.footerRow}>
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
          <a
            href={YANDEX_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.yandexBottomBtn}
          >
            Читать все отзывы на Яндекс Картах
            <ExternalLink size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  )
}
