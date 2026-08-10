import Header from './components/Header'
import Hero from './components/Hero'
import BookingBar from './components/BookingBar'
import About from './components/About'
import Services from './components/Services'
import Rooms from './components/Rooms'
import History from './components/History'
import Reviews from './components/Reviews'
import CtaBanner from './components/CtaBanner'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BookingBar />
        <About />
        <Services />
        <Rooms />
        <History />
        <Reviews />
        <CtaBanner />
        <Contacts />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
