import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Users, Calendar } from 'lucide-react'
import styles from './BookingBar.module.css'

function today() {
  return new Date().toISOString().split('T')[0]
}
function addDays(dateStr: string, n: number) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

export default function BookingBar() {
  const [checkin, setCheckin] = useState(today())
  const [checkout, setCheckout] = useState(addDays(today(), 1))
  const [guests, setGuests] = useState('2')

  useEffect(() => {
    if (new Date(checkout) <= new Date(checkin)) {
      setCheckout(addDays(checkin, 1))
    }
  }, [checkin, checkout])

  return (
    <section className={styles.section} aria-label="Форма бронирования">
      <div className="container">
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Checkin */}
          <div className={styles.field}>
            <label htmlFor="checkin">
              <Calendar size={14} strokeWidth={2} />
              Дата заезда
            </label>
            <input
              id="checkin"
              type="date"
              value={checkin}
              min={today()}
              onChange={e => setCheckin(e.target.value)}
            />
          </div>

          <div className={styles.divider} />

          {/* Checkout */}
          <div className={styles.field}>
            <label htmlFor="checkout">
              <Calendar size={14} strokeWidth={2} />
              Дата выезда
            </label>
            <input
              id="checkout"
              type="date"
              value={checkout}
              min={addDays(checkin, 1)}
              onChange={e => setCheckout(e.target.value)}
            />
          </div>

          <div className={styles.divider} />

          {/* Guests */}
          <div className={styles.field}>
            <label htmlFor="guests">
              <Users size={14} strokeWidth={2} />
              Гостей
            </label>
            <select id="guests" value={guests} onChange={e => setGuests(e.target.value)}>
              <option value="1">1 гость</option>
              <option value="2">2 гостя</option>
              <option value="3">3 гостя</option>
              <option value="4">4 гостя</option>
              <option value="5">5+ гостей</option>
            </select>
          </div>

          {/* Submit */}
          <motion.a
            href="tel:+79876037943"
            className={styles.submit}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(27,48,34,0.25)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Search size={16} strokeWidth={2.5} />
            Проверить
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
