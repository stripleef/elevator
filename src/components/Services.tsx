import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Utensils, Car, WashingMachine, X, ChevronLeft, ChevronRight } from 'lucide-react'
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
const IMG_LAUNDRY = 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800'

export default function Services() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const showNextImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % CANTEEN_IMAGES.length)
  }

  const showPrevImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + CANTEEN_IMAGES.length) % CANTEEN_IMAGES.length)
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.45
      carouselRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' })
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
                  onClick={() => scrollCarousel('left')}
                  aria-label="Листать влево"
                >
                  <ChevronLeft size={24} strokeWidth={2} />
                </button>
                <div className={styles.carousel} ref={carouselRef}>
                  {CANTEEN_IMAGES.map((img, i) => (
                    <div key={i} className={styles.carouselImgWrap} onClick={() => setLightboxIndex(i)}>
                      <img src={img} alt={`Столовая фото ${i+1}`} className={styles.serviceImg} />
                    </div>
                  ))}
                </div>
                <button 
                  className={`${styles.carouselNavBtn} ${styles.carouselNext}`}
                  onClick={() => scrollCarousel('right')}
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

            {/* Parking & Laundry Split Row */}
            <div className={styles.splitRow}>
              
              {/* Parking Block */}
              <motion.div className={styles.serviceBlock} variants={fadeUpItem}>
                <div className={styles.serviceImgPlaceholder}>P</div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIcon}>
                    <Car size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.serviceText}>
                    <h3>Охраняемая парковка</h3>
                    <p>
                      Надежная и просторная охраняемая парковка на территории гостиницы. Мы предлагаем места как для легковых 
                      автомобилей, так и для большегрузного транспорта. Вы можете спокойно отдыхать, зная, что ваш автомобиль в безопасности.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Laundry Block */}
              <motion.div className={styles.serviceBlock} variants={fadeUpItem}>
                <img src={IMG_LAUNDRY} alt="Прачечная" className={styles.serviceImg} />
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIcon}>
                    <WashingMachine size={20} strokeWidth={2} />
                  </div>
                  <div className={styles.serviceText}>
                    <h3>Прачечная</h3>
                    <p>
                      Мы позаботимся о чистоте ваших вещей. Воспользуйтесь услугами нашей прачечной для стирки, сушки и глажки 
                      одежды. Быстрое и качественное обслуживание позволит вам всегда выглядеть безупречно во время поездки.
                    </p>
                    <a href="#" className={styles.serviceLink}>Прайс-лист</a>
                  </div>
                </div>
              </motion.div>

            </div>
          </Stagger>
        </div>
      </section>

      {/* Lightbox Modal for Canteen */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button className={styles.lightboxClose} onClick={() => setLightboxIndex(null)} aria-label="Закрыть">
              <X size={32} />
            </button>
            
            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={showPrevImg} aria-label="Предыдущее фото">
              <ChevronLeft size={36} />
            </button>

            <motion.img
              key={lightboxIndex}
              src={CANTEEN_IMAGES[lightboxIndex]}
              alt="Увеличенное фото столовой"
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
