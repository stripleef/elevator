import { MapPin, Phone, MessageCircle, Clock, Building2, ExternalLink } from 'lucide-react'
import { FadeIn } from './AnimationUtils'
import styles from './Contacts.module.css'

const CONTACTS = [
  {
    Icon: MapPin,
    label: 'Адрес',
    value: 'Респ. Башкортостан, Мелеузовский р-н, с. Зирган, ул. Гагарина, 1',
    href: undefined,
  },
  { Icon: Phone, label: 'Телефон', value: '+7 (917) 447-55-41', href: 'tel:+79174475541' },
  { Icon: MessageCircle, label: 'WhatsApp', value: '+7 (917) 447-55-41', href: 'https://wa.me/79174475541' },
  { Icon: Clock, label: 'Режим работы', value: 'Круглосуточно, без выходных', href: undefined },
  { Icon: Building2, label: 'Организация', value: 'ООО «Зирганский Элеватор»', href: undefined },
]

export default function Contacts() {
  return (
    <section id="contacts" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <FadeIn><p className={styles.eyebrow}>Контакты</p></FadeIn>
            <FadeIn delay={0.1}><h2 className={styles.title}>Как нас найти</h2></FadeIn>

            <div className={styles.list}>
              {CONTACTS.map(({ Icon, label, value, href }, i) => (
                <FadeIn key={label} delay={i * 0.07 + 0.1}>
                  <div className={styles.item}>
                    <div className={styles.icon}>
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className={styles.itemLabel}>{label}</span>
                      {href ? (
                        <a href={href} className={styles.itemValue} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {value}
                        </a>
                      ) : (
                        <p className={styles.itemValuePlain}>{value}</p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Yandex Map */}
          <FadeIn delay={0.2} direction="left">
            <div className={styles.mapCard}>
              <iframe
                src="https://yandex.ru/map-widget/v1/org/tirmen/241654012395/"
                className={styles.mapIframe}
                title="Расположение гостиницы ТИРМЭН на карте"
                allowFullScreen
                referrerPolicy="no-referrer"
              />
              <a
                href="https://yandex.ru/maps/org/tirmen/241654012395/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapOpenBtn}
              >
                <ExternalLink size={14} strokeWidth={2} />
                Открыть в Яндекс Картах
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
