import { Cinzel_Decorative } from '@next/font/google'
import { PrismicLink } from '@prismicio/react'
const serif = Cinzel_Decorative({ weight: '400', subsets: ['latin'] })

const MenuItem = ({ field, linktext }) => {
  return (
    <li className={`${serif.className}`}>
      <PrismicLink
        field={field}
        className="rounded-md px-4 py-2 transition duration-200 ease-in-out hover:bg-slate-800 hover:text-purple-200"
      >
        {linktext}
      </PrismicLink>
    </li>
  )
}
export default MenuItem
