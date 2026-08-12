import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from './AnimationUtils'
import styles from './History.module.css'

const TIMELINE = [
  { year: '1990-е', desc: 'Зирганский элеватор принят в эксплуатацию — стал ключевым аграрным объектом Мелеузовского района.' },
  { year: '2016 г.', desc: 'Предприятие реорганизовано и официально стало ООО «Зирганский Элеватор».' },
  { year: '2023 г.', desc: 'Открытие комфортабельной гостиницы «Тирмэн» для приёма гостей, партнёров и путешественников.' },
  { year: 'Сегодня', desc: 'Тысячи довольных гостей. Гостеприимство, чистота и домашний уют — неизменные ценности.' },
]

export default function History() {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"]
  })
  
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="history" className={styles.section} ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {/* Text */}
          <div className={styles.textCol}>
            <FadeIn>
              <p className={styles.eyebrow}>История</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className={styles.title}>Наши корни —<br />в сердце Башкортостана</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className={styles.body}>
                Гостиница «Тирмэн» — часть большого предприятия ООО «Зирганский Элеватор». На протяжении десятилетий элеватор является сердцем аграрного хозяйства Мелеузовского района.
              </p>
              <p className={styles.body} style={{ marginTop: 16 }}>
                Мы гордимся историей и сохраняем традиции тёплого башкирского гостеприимства для каждого гостя, заехавшего к нам в любое время суток.
              </p>
            </FadeIn>
          </div>

          {/* Timeline */}
          <div className={styles.timeline}>
            {/* The single continuous line tracking scroll progress */}
            <div className={styles.timelineTrack}>
              <motion.div 
                className={styles.timelineFill}
                style={{ scaleY: lineScaleY }}
              />
            </div>
            
            {TIMELINE.map(({ year, desc }, i) => (
              <FadeIn key={year} delay={i * 0.1}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineLine}>
                    <motion.div
                      className={styles.dot}
                      initial={{ scale: 0.3, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, margin: '-20%' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  </div>
                  <div className={styles.timelineContent}>
                    <span className={styles.year}>{year}</span>
                    <p className={styles.timelineDesc}>{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
