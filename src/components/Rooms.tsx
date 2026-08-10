import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, Tv, Wind, ShowerHead, Users, X } from 'lucide-react'
import { FadeIn, Stagger, fadeUpItem } from './AnimationUtils'
import styles from './Rooms.module.css'

interface Room {
  id: string
  name: string
  price: string
  badge?: string
  img: string
  desc: string
  amenities: { icon: React.FC<{ size: number; strokeWidth: number; className?: string }>; label: string }[]
  featured?: boolean
}

const ROOMS: Room[] = [
  {
    id: 'economy',
    name: 'Эконом',
    price: 'от 1 500 ₽',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLtiz6YHFt5cDKr6ySVZxXUGe-u5jRWAun6o3A9In3Ithj5KN_uj6au0muSor8aiwfsMgtN3gVwr-Q5XrJKKf-KGDVqsCVS6OEWStqeYGDAT-l3UJmNa8ssEMW6n5H7uxjNFMdWd6DnicsrNF_dmZ5oIm9TNWH6BdJgJQHeH_OOuybIGtluHo_DsOi8NXT0c_xZjgnpzX5adluEKobYY-Gue1PhgMoLtQcOVokpghbUfJMx01MTTBqEpdNk',
    desc: 'Чистый и уютный номер для спокойного сна. Удобства расположены на этаже. Гарантируем тишину и свежее бельё.',
    amenities: [
      { icon: Users, label: '2 кровати' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
  {
    id: 'standard',
    name: 'Стандарт',
    price: 'от 2 500 ₽',
    badge: 'Популярный',
    featured: true,
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLsYoNy8cOWIBXUmAiO79miKx638LsmkimcC6Zjq5VjA-03M3jQIxb8AkFHbRCL7QSo_Xwq5IDS65wzv7rd47IlJZDaiJAMAo9lqW74fQl_hQOseN9791-gRyMGrcK7tI_Sz-1bKiNh46sBzrcoIJTyG9y76ulQljgQ1-Lflne0uhu35Ob4owWAugnH2ao6D3zxyLyog_VVpl7cDaPSPBk8r8zfSgbVUqnhTpw4c86wAfbZKAFafBQH1ZQo',
    desc: 'Комфортный номер с собственным душем и санузлом. Безупречная чистота и тишина — всё необходимое для отдыха.',
    amenities: [
      { icon: ShowerHead, label: 'Свой санузел' },
      { icon: Tv, label: 'ТВ' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
  {
    id: 'family',
    name: 'Семейный',
    price: 'от 4 000 ₽',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLtBAE3lCFYdsyewTRVeML9N4Q2gk2-AnF9nsMK7CdGzmzKMvW_tnBBE6nL_gq3YEUDq3eK_PA70kqiPB0oBh2GxQra-L_BDPQGQeWPJjoIFFduDQxa0meq3WViHx1cU6PpqL4hoV5Yfbc6f3WO3RF6DAT4NhrkPQPM8SSUn_dBqyatY_0UWEL9Pu4P0Intp2MnOPkl-0kaCeBWe5f2E9rO0Iq-JQ29f8S2QHQ-7U1xaoVmd0ALShFrKrmI',
    desc: 'Просторный номер для всей семьи. Две комнаты, свой санузел и уютная атмосфера для полноценного отдыха.',
    amenities: [
      { icon: ShowerHead, label: 'Свой санузел' },
      { icon: Wind, label: 'Кондиционер' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
]

function RoomCard({ room, onImgClick }: { room: Room; onImgClick: (img: string) => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className={`${styles.card} ${room.featured ? styles.cardFeatured : ''}`}
      variants={fadeUpItem}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div 
        className={styles.imgWrap} 
        onClick={() => onImgClick(room.img)}
        style={{ cursor: 'pointer' }}
        title="Увеличить фото"
      >
        <motion.img
          src={room.img}
          alt={`Номер ${room.name}`}
          className={styles.img}
          referrerPolicy="no-referrer"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        />
        <div className={styles.priceBadge}>{room.price}<span>/сут.</span></div>
        {room.badge && <div className={styles.featuredBadge}>{room.badge}</div>}
        <motion.div
          className={styles.imgOverlay}
          animate={{ opacity: hovered ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{room.name}</h3>
        <p className={styles.desc}>{room.desc}</p>

        <ul className={styles.amenities}>
          {room.amenities.map(({ icon: Icon, label }) => (
            <li key={label} className={styles.amenity}>
              <Icon size={14} strokeWidth={2} className={styles.amenityIcon} />
              {label}
            </li>
          ))}
        </ul>

        <motion.a
          href="tel:+79876037943"
          className={`${styles.bookBtn} ${room.featured ? styles.bookBtnFilled : styles.bookBtnOutline}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          Выбрать номер
        </motion.a>
      </div>
    </motion.article>
  )
}

export default function Rooms() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  return (
    <>
      <section id="rooms" className={styles.section}>
        <div className="container">
          <div className={styles.header}>
            <div>
              <FadeIn><p className={styles.eyebrow}>Номера</p></FadeIn>
              <FadeIn delay={0.1}><h2 className={styles.title}>Выберите свой номер</h2></FadeIn>
            </div>
            <FadeIn delay={0.15} direction="right">
              <p className={styles.subtitle}>Идеальная чистота, свежее бельё и тишина для вашего отдыха.</p>
            </FadeIn>
          </div>

          <Stagger className={styles.grid} staggerDelay={0.1}>
            {ROOMS.map((room, i) => (
              <RoomCard key={room.id} room={room} onImgClick={setSelectedImg} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className={styles.lightboxClose}
              onClick={() => setSelectedImg(null)}
              aria-label="Закрыть фото"
            >
              <X size={32} />
            </button>
            <motion.img
              src={selectedImg}
              alt="Увеличенное фото номера"
              className={styles.lightboxImg}
              referrerPolicy="no-referrer"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
