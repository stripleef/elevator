import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, Tv, Wind, ShowerHead, Users, X, Phone, Images, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react'
import { FadeIn, Stagger, fadeUpItem } from './AnimationUtils'
import styles from './Rooms.module.css'

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

interface Room {
  id: string
  name: string
  roomNumbers: string
  badge?: string
  images: string[]
  desc: string
  amenities: { icon: React.FC<{ size: number; strokeWidth: number; className?: string }>; label: string }[]
  featured?: boolean
}

const ROOMS: Room[] = [
  {
    id: 'ekonom',
    name: 'ЭКОНОМ',
    roomNumbers: 'Номера: 1, 2, 3, 4, 6, 14, 15, 16, 18, 19',
    images: [
      './rooms/ekonom/stand.jpg',
      './rooms/ekonom/stand2.jpg',
    ],
    desc: 'Уютный и чистый номер с тремя односпальными кроватями. Удобства (душ и санузел) расположены на этаже. Гарантируем идеальную чистоту и свежее бельё.',
    amenities: [
      { icon: Users, label: '3 односпальные кровати' },
      { icon: ShowerHead, label: 'Душ и туалет на этаже' },
      { icon: Wind, label: 'Кондиционер' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
  {
    id: 'standart-1',
    name: 'СТАНДАРТ',
    roomNumbers: 'Номер: 5',
    badge: 'Популярный',
    featured: true,
    images: [
      './rooms/standart1/standart1.jpg',
      './rooms/standart1/standart2.jpg',
    ],
    desc: 'Комфортный номер с одной двухспальной и одной 1,5-спальной кроватью. Общий душ и туалет расположены на этаже.',
    amenities: [
      { icon: Users, label: '1 двуспальная + 1.5-спальная кровать' },
      { icon: ShowerHead, label: 'Душ и туалет на этаже' },
      { icon: Tv, label: 'ТВ' },
      { icon: Wind, label: 'Кондиционер' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
  {
    id: 'standart-2',
    name: 'СТАНДАРТ',
    roomNumbers: 'Номера: 7, 20',
    images: [
      './rooms/standart2/stan.jpg',
      './rooms/standart2/stan2.jpg',
    ],
    desc: 'Уютный двухместный номер с двухспальной кроватью. Удобства (душ и туалет) расположены на этаже.',
    amenities: [
      { icon: Users, label: '1 двуспальная кровать' },
      { icon: ShowerHead, label: 'Душ и туалет на этаже' },
      { icon: Tv, label: 'ТВ' },
      { icon: Wind, label: 'Кондиционер' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
  {
    id: 'komfort-1',
    name: 'КОМФОРТ',
    roomNumbers: 'Номера: 10, 12',
    images: [
      './rooms/komfort1/komfort1.jpg',
      './rooms/komfort1/komfort2.jpg',
      './rooms/komfort1/komfort3.jpg',
      './rooms/komfort1/komfort4.jpg',
      './rooms/komfort1/komfort5.jpg',
    ],
    desc: 'Комфортабельный номер с двухспальной кроватью и собственным санузлом (душ и туалет) прямо в номере.',
    amenities: [
      { icon: Users, label: '1 двуспальная кровать' },
      { icon: ShowerHead, label: 'Свой душ и санузел' },
      { icon: Tv, label: 'ТВ' },
      { icon: Wind, label: 'Кондиционер' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
  {
    id: 'komfort-2',
    name: 'КОМФОРТ',
    roomNumbers: 'Номера: 8, 9',
    images: [
      './rooms/komfort2/komf.jpg',
      './rooms/komfort2/komf2.jpg',
      './rooms/komfort2/komf3.jpg',
      './rooms/komfort2/komf4.jpg',
      './rooms/komfort2/komf5.jpg',
    ],
    desc: 'Номер «Комфорт» с двумя отдельными односпальными кроватями, собственным душем, туалетом и холодильником.',
    amenities: [
      { icon: Users, label: '2 односпальные кровати' },
      { icon: ShowerHead, label: 'Свой душ и санузел' },
      { icon: Tv, label: 'ТВ' },
      { icon: Wind, label: 'Холодильник' },
      { icon: Wind, label: 'Кондиционер' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
  {
    id: 'komfort-3',
    name: 'КОМФОРТ (Семейный)',
    roomNumbers: 'Номер: 11',
    images: [],
    desc: 'Большой многоместный номер «Комфорт» с одной двухспальной и тремя односпальными кроватями, душем, туалетом и холодильником.',
    amenities: [
      { icon: Users, label: '1 двуспальная + 3 односпальные' },
      { icon: ShowerHead, label: 'Свой душ и санузел' },
      { icon: Tv, label: 'ТВ' },
      { icon: Wind, label: 'Холодильник' },
      { icon: Wind, label: 'Кондиционер' },
      { icon: Wifi, label: 'Wi-Fi' },
    ],
  },
]

function PriceDropdown({ onClose }: { onClose: () => void }) {
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
        Для уточнения всех цен звоните по номеру:
      </p>
      <a href={PHONE_HREF} className={styles.callDropdownPhone}>
        <Phone size={16} strokeWidth={2} />
        {PHONE_NUMBER}
      </a>
      <p className={styles.priceNote}>
        Стоимость зависит от количества человек и дней проживания, но она вас приятно удивят!
      </p>
    </motion.div>
  )
}

function RoomCard({ 
  room, 
  onOpenGallery 
}: { 
  room: Room
  onOpenGallery: (images: string[], startIndex: number) => void 
}) {
  const [hovered, setHovered] = useState(false)
  const [showPricePopup, setShowPricePopup] = useState(false)
  const isMobile = useIsMobile()

  const handlePriceClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault()
      setShowPricePopup(prev => !prev)
    }
  }

  const hasImages = room.images.length > 0
  const mainImage = hasImages ? room.images[0] : null

  return (
    <motion.article
      className={`${styles.card} ${room.featured ? styles.cardFeatured : ''}`}
      variants={fadeUpItem}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div 
        className={styles.imgWrap} 
        onClick={() => hasImages && onOpenGallery(room.images, 0)}
        style={{ cursor: hasImages ? 'pointer' : 'default' }}
        title={hasImages ? 'Нажмите, чтобы посмотреть все фото' : 'Фотографий пока нет'}
      >
        {mainImage ? (
          <motion.img
            src={mainImage}
            alt={`Номер ${room.name}`}
            className={styles.img}
            referrerPolicy="no-referrer"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          />
        ) : (
          <div className={styles.noImgPlaceholder}>
            <Images size={40} strokeWidth={1.5} />
            <span>Скоро добавим фото</span>
          </div>
        )}

        {/* Price Tag Button on top of Card Image */}
        <button
          type="button"
          className={styles.priceBadgeBtn}
          onClick={(e) => {
            e.stopPropagation()
            handlePriceClick(e)
          }}
        >
          <HelpCircle size={14} strokeWidth={2.5} />
          Узнать цену
        </button>

        {/* Photos indicator badge */}
        {hasImages && (
          <div className={styles.photosBadge}>
            <Images size={13} strokeWidth={2} />
            <span>{room.images.length} фото</span>
          </div>
        )}

        {room.badge && <div className={styles.featuredBadge}>{room.badge}</div>}

        {hasImages && (
          <motion.div
            className={styles.imgOverlay}
            animate={{ opacity: hovered ? 0.15 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.cardHeaderInfo}>
          <h3 className={styles.name}>{room.name}</h3>
          <span className={styles.roomNumbersTag}>{room.roomNumbers}</span>
        </div>

        <p className={styles.desc}>{room.desc}</p>

        <ul className={styles.amenities}>
          {room.amenities.map(({ icon: Icon, label }, index) => (
            <li key={index} className={styles.amenity}>
              <Icon size={14} strokeWidth={2} className={styles.amenityIcon} />
              {label}
            </li>
          ))}
        </ul>

        <div className={styles.bookBtnWrap}>
          <motion.a
            href={PHONE_HREF}
            onClick={handlePriceClick}
            className={`${styles.bookBtn} ${styles.bookBtnOutline}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Узнать цену и забронировать
          </motion.a>
          <AnimatePresence>
            {showPricePopup && <PriceDropdown onClose={() => setShowPricePopup(false)} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  )
}

export default function Rooms() {
  const [galleryModal, setGalleryModal] = useState<{ images: string[]; index: number } | null>(null)

  const showNextImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (galleryModal) {
      setGalleryModal({
        images: galleryModal.images,
        index: (galleryModal.index + 1) % galleryModal.images.length,
      })
    }
  }

  const showPrevImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (galleryModal) {
      setGalleryModal({
        images: galleryModal.images,
        index: (galleryModal.index - 1 + galleryModal.images.length) % galleryModal.images.length,
      })
    }
  }

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
              <p className={styles.subtitle}>6 вариантов размещения. Идеальная чистота, свежее бельё и тишина для вашего отдыха.</p>
            </FadeIn>
          </div>

          <Stagger className={styles.grid} staggerDelay={0.08}>
            {ROOMS.map((room) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onOpenGallery={(images, index) => setGalleryModal({ images, index })} 
              />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Lightbox Modal for Room Photos */}
      <AnimatePresence>
        {galleryModal !== null && galleryModal.images.length > 0 && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryModal(null)}
          >
            <button 
              className={styles.lightboxClose} 
              onClick={() => setGalleryModal(null)} 
              aria-label="Закрыть фото"
            >
              <X size={32} />
            </button>

            {galleryModal.images.length > 1 && (
              <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={showPrevImg} aria-label="Предыдущее фото">
                <ChevronLeft size={36} />
              </button>
            )}

            <motion.img
              key={galleryModal.index}
              src={galleryModal.images[galleryModal.index]}
              alt="Увеличенное фото номера"
              className={styles.lightboxImg}
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />

            {galleryModal.images.length > 1 && (
              <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={showNextImg} aria-label="Следующее фото">
                <ChevronRight size={36} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

