import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Utensils, X, ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { FadeIn, Stagger, fadeUpItem } from './AnimationUtils'
import styles from './Services.module.css'

const CANTEEN_IMAGES = [
  './stlovoaya10.jpg',
  './stolovaya11.jpg',
  './stolovaya121.jpg',
  './stolovaya13.jpg',
  './stolovay.webp',
  './stolovaya2.webp',
  './stolovaya3.webp',
  './stolovaya4.webp'
]

const SAUNA_IMAGES = [
  './sauna/sauna1.jpg',
  './sauna/sauna2.jpg',
  './sauna/sauna3.jpg',
  './sauna/sauna4.jpg'
]

export default function Services() {
  const [activeLightbox, setActiveLightbox] = useState<{ images: string[]; index: number } | null>(null)
  const canteenRef = useRef<HTMLDivElement>(null)
  const saunaRef = useRef<HTMLDivElement>(null)

  const showNextImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeLightbox) {
      setActiveLightbox({
        images: activeLightbox.images,
        index: (activeLightbox.index + 1) % activeLightbox.images.length
      })
    }
  }

  const showPrevImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeLightbox) {
      setActiveLightbox({
        images: activeLightbox.images,
        index: (activeLightbox.index - 1 + activeLightbox.images.length) % activeLightbox.images.length
      })
    }
  }

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.45
      ref.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <>
      <section id="services" className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <FadeIn><h2 className={styles.title}>Наши услуги</h2></FadeIn>
            <FadeIn delay={0.1}>
              <p className={styles.subtitle}>
                Мы заботимся о вашем комфорте и предлагаем необходимые услуги, чтобы сделать
                ваше пребывание в гостинице «Тирмэн» или остановку в пути удобной и приятной.
              </p>
            </FadeIn>
          </div>

          <Stagger className={styles.servicesList} staggerDelay={0.1}>
            
            {/* Canteen Block */}
            <motion.div className={styles.serviceBlock} variants={fadeUpItem}>
              <div className={styles.carouselWrapper}>
                <button 
                  className={`${styles.carouselNavBtn} ${styles.carouselPrev}`}
                  onClick={() => scrollCarousel(canteenRef, 'left')}
                  aria-label="Листать влево"
                >
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>
                <div className={styles.carousel} ref={canteenRef}>
                  {CANTEEN_IMAGES.map((img, i) => (
                    <div key={i} className={styles.carouselImgWrap} onClick={() => setActiveLightbox({ images: CANTEEN_IMAGES, index: i })}>
                      <img src={img} alt={`Столовая фото ${i+1}`} className={styles.serviceImg} />
                    </div>
                  ))}
                </div>
                <button 
                  className={`${styles.carouselNavBtn} ${styles.carouselNext}`}
                  onClick={() => scrollCarousel(canteenRef, 'right')}
                  aria-label="Листать вправо"
                >
                  <ChevronRight size={24} strokeWidth={2} />
                </button>
              </div>
              <div className={styles.serviceContent}>
                <div className={styles.serviceIcon}>
                  <Utensils size={20} strokeWidth={2} />
                </div>
                <div className={styles.serviceText}>
                  <h3>Столовая</h3>
                  <p>
                    Наша гордость — по-настоящему вкусная домашняя кухня. Мы ежедневно готовим свежие блюда, а 
                    наша выпечка славится на всю округу. Столовая работает круглосуточно, что делает её идеальным 
                    местом для отдыха и перекуса как для гостей отеля, так и для проезжающих водителей.
                  </p>
                  <a href="#" className={styles.serviceLink}>Ознакомиться с меню</a>
                </div>
              </div>
            </motion.div>

            {/* Sauna Block */}
            <motion.div className={styles.serviceBlock} variants={fadeUpItem}>
              <div className={styles.carouselWrapper}>
                <button 
                  className={`${styles.carouselNavBtn} ${styles.carouselPrev}`}
                  onClick={() => scrollCarousel(saunaRef, 'left')}
                  aria-label="Листать влево"
                >
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>
                <div className={styles.carousel} ref={saunaRef}>
                  {SAUNA_IMAGES.map((img, i) => (
                    <div key={i} className={styles.carouselImgWrap} onClick={() => setActiveLightbox({ images: SAUNA_IMAGES, index: i })}>
                      <img src={img} alt={`Сауна фото ${i+1}`} className={styles.serviceImg} />
                    </div>
                  ))}
                </div>
                <button 
                  className={`${styles.carouselNavBtn} ${styles.carouselNext}`}
                  onClick={() => scrollCarousel(saunaRef, 'right')}
                  aria-label="Листать вправо"
                >
                  <ChevronRight size={24} strokeWidth={2} />
                </button>
              </div>
              <div className={styles.serviceContent}>
                <div className={styles.serviceIcon}>
                  <Flame size={20} strokeWidth={2} />
                </div>
                <div className={styles.serviceText}>
                  <h3>Финская сауна и парная</h3>
                  <p>
                    Для глубокого расслабления и оздоровления в нашей гостинице работает уединенная парная сауна.
                    Уютная комната отдыха, идеальная чистота и горячий пар помогут полностью снять усталость с дороги и восстановить силы.
                  </p>
                </div>
              </div>
            </motion.div>

          </Stagger>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox !== null && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
          >
            <button className={styles.lightboxClose} onClick={() => setActiveLightbox(null)} aria-label="Закрыть">
              <X size={32} />
            </button>
            
            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={showPrevImg} aria-label="Предыдущее фото">
              <ChevronLeft size={36} />
            </button>

            <motion.img
              key={activeLightbox.index}
              src={activeLightbox.images[activeLightbox.index]}
              alt="Увеличенное фото"
              className={styles.lightboxImg}
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={showNextImg} aria-label="Следующее фото">
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
