import { PrismicLink } from '@prismicio/react'

const MenuItem = ({ field, linktext }) => {
  return (
    <PrismicLink
      field={field}
      className="rounded-md px-4 py-2 transition duration-200 ease-in-out hover:bg-slate-900 hover:text-purple-200"
    >
      {linktext}
    </PrismicLink>
  )
}
export default MenuItem
