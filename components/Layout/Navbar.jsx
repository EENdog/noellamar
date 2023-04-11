import { PrismicLink } from '@prismicio/react'
import Heading from '../Heading'
import Link from 'next/link'
import MenuItem from '../MenuItem'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = ({
  data,
  serif,
  mobileOpen,
  setMobileOpen,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      <nav
        className={`flex min-w-full items-center justify-between bg-black ${serif.className} min-h-[80px]`}
      >
        <Heading as="h1" size="4xl" className={`ml-6 text-purple-300`}>
          <Link href="/">Noel Lamar</Link>
        </Heading>
        {data && data.menuitems.length > 0 && (
          <>
            <ul className={`mr-6 hidden justify-evenly space-x-6 lg:flex `}>
              {data.menuitems.map((item, i) => {
                return (
                  <li key={item.link.id || item.link.url}>
                    <MenuItem field={item.link} linktext={item.linktext} />
                  </li>
                )
              })}
            </ul>
            <button
              onClick={() => {
                setMobileOpen(true)
              }}
              className="lg:hidden"
            >
              <HiMenu className="mr-6 h-10 w-10 text-purple-300" />
              <p className="sr-only">Open Navigation Menu</p>
            </button>
          </>
        )}
      </nav>
      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-20 h-screen w-full overflow-auto bg-slate-900  ${
          mobileOpen ? `block` : `hidden`
        }`}
      >
        <header className="flex justify-end px-4 py-8">
          <button
            onClick={() => {
              setMobileOpen(false)
            }}
            className={``}
          >
            <HiX className="h-8 w-8 text-purple-300" />
          </button>
        </header>
        <nav className="flex justify-center px-8 text-center">
          {data && data.menuitems.length > 0 && (
            <ul className="grid grid-flow-row gap-y-8">
              {data.menuitems.map((item, i) => {
                return (
                  <li
                    key={`mobile${item.link.id}` || `mobile${item.link.url}`}
                    className={serif.className}
                  >
                    <PrismicLink
                      onClick={() => {
                        setMobileOpen(false)
                      }}
                      field={item.link}
                    >
                      {item.linktext}
                    </PrismicLink>
                  </li>
                )
              })}
            </ul>
          )}
        </nav>
      </div>
    </>
  )
}
export default Navbar
