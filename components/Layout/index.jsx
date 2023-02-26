import { Cinzel_Decorative, Urbanist } from '@next/font/google'
import Navbar from './Navbar'
const sans = Urbanist({ subsets: ['latin'] })
const serif = Cinzel_Decorative({ weight: '400', subsets: ['latin'] })

const Layout = ({ children, navigation }) => {
  return (
    <div className="relative text-purple-50">
      <a
        href="#main-content"
        className=" btn-warning btn fixed top-12 -left-[320px] z-10 transform opacity-50 focus:translate-x-[380px] focus:opacity-100 "
      >
        Press Enter to Skip to Main Content
      </a>
      <div className={`flex min-h-screen flex-col bg-slate-900`}>
        <Navbar {...navigation} serif={serif} />
        <main id="main-content" className={sans.className}>
          {children}
        </main>
        {/* <Footer {...footer} />
        <Consent /> */}
      </div>
    </div>
  )
}
export default Layout
