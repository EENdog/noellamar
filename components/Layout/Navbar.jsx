import { PrismicLink } from '@prismicio/react'
import Heading from '../Heading'
import Link from 'next/link'
import MenuItem from '../MenuItem'

const Navbar = ({ data, serif }) => {
  return (
    <nav
      className={`flex min-w-full items-center justify-between ${serif.className} min-h-[80px]`}
    >
      <Heading as="h1" size="4xl" className={`ml-6 text-purple-300`}>
        <Link href="/">Noel Lamar</Link>
      </Heading>
      {data && data.menuitems.length > 0 && (
        <ul className={`mr-6 hidden justify-evenly space-x-6 lg:flex `}>
          {data.menuitems.map((item, i) => (
            <MenuItem
              key={item.link.id || item.link.url}
              field={item.link}
              linktext={item.linktext}
            />
          ))}
        </ul>
      )}
    </nav>
  )
}
export default Navbar
