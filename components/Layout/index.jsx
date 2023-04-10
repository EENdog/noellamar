import * as React from 'react'
import { Cinzel_Decorative, Urbanist } from "next/font/google"
import Navbar from './Navbar'
import Footer from './Footer'
import { HiChevronUp } from 'react-icons/hi'
const sans = Urbanist({ subsets: ['latin'] })
const serif = Cinzel_Decorative({ weight: '400', subsets: ['latin'] })

const Layout = ({ children, navigation }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const toggleVisible = setState => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 400) {
      setState(true)
    } else if (scrolled <= 400) {
      setState(false)
    }
  }

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  React.useEffect(() => {
    const scrollY = document.body.style.top
    if (mobileOpen) {
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0'))
    }
  }, [mobileOpen])

  React.useEffect(() => {
    const toggleToTop = () => {
      toggleVisible(setIsScrolled)
    }
    window.addEventListener('scroll', toggleToTop)
    return () => {
      window.removeEventListener('scroll', toggleToTop)
    }
  }, [isScrolled])
  return (
    <div className="relative text-purple-50">
      <a
        href="#main-content"
        className=" btn-warning btn fixed top-12 -left-[320px] z-10 transform opacity-50 focus:translate-x-[380px] focus:opacity-100 "
      >
        Press Enter to Skip to Main Content
      </a>
      <div className={`flex min-h-screen flex-col bg-slate-900`}>
        <Navbar
          {...navigation}
          serif={serif}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <main id="main-content" className={sans.className}>
          {children}
        </main>
        <Footer sans={sans} />
        {/* <Consent /> */}
        <button onClick={handleToTop}>
          <HiChevronUp
            className={`fixed bottom-6 right-6 h-8 w-8 rounded-full bg-purple-900 bg-opacity-60 text-purple-100 motion-safe:transition motion-safe:duration-500 motion-safe:ease-in-out ${
              isScrolled ? `visible` : ` translate-y-[100px]`
            }`}
          />
          <span className="sr-only">Scroll to the top of the page</span>
        </button>
      </div>
    </div>
  )
}
export default Layout
