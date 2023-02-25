import { Quicksand } from '@next/font/google'

const sans = Quicksand({ subsets: ['latin'] })

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <a
        href="#main-content"
        className=" btn-warning btn fixed top-12 -left-[320px] z-10 transform opacity-50 focus:translate-x-[380px] focus:opacity-100 "
      >
        Press Enter to Skip to Main Content
      </a>
      <div className={`flex min-h-screen flex-col `}>
        {/* <Navbar /> */}
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
