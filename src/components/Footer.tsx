import styles from './Footer.module.css'

const NAV = [
  { href: '#about', label: 'О гостинице' },
  { href: '#rooms', label: 'Номера' },
  { href: '#services', label: 'Услуги' },
  { href: '#history', label: 'История' },
  { href: '#contacts', label: 'Контакты' },
]

const LEGAL = [
  { href: '#', label: 'Политика конфиденциальности' },
  { href: '#', label: 'Правила проживания' },
  { href: '#', label: 'Партнёрам' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoWrap}>
              <img src="/logo.png" alt="Логотип ТИРМЭН" className={styles.logoImg} />
              <span className={styles.logoText}>ТИРМЭН</span>
            </div>
            <p className={styles.desc}>
              Гостиница для комфортного отдыха в пути. Практично, чисто, уютно.
              Башкортостан, с. Зирган.
            </p>
            <p className={styles.copyright}>
              © 2024 Гостиница ТИРМЭН. Все права защищены.<br />
              ООО «Зирганский Элеватор»
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Навигация</h4>
            <ul>
              {NAV.map(({ href, label }) => (
                <li key={label}><a href={href} className={styles.link}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Информация</h4>
            <ul>
              {LEGAL.map(({ href, label }) => (
                <li key={label}><a href={href} className={styles.link}>{label}</a></li>
              ))}
              <li key="phone"><a href="tel:+79876037943" className={styles.link}>+7 (987) 603-79-43</a></li>
              <li key="whatsapp"><a href="https://wa.me/79174475541" target="_blank" rel="noopener noreferrer" className={styles.link}>WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.divider} />
      </div>
    </footer>
  )
}
