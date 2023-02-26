import * as prismicH from '@prismicio/helpers'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import Heading from './Heading'

const BlogCard = ({
  as: Comp = 'li',
  id,
  data,
  url,
  index,
  first_publication_date,
}) => {
  const datepublished = new Date(first_publication_date).toLocaleDateString(
    'en-US',
    { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  )
  return (
    <Comp
      key={id}
      className=" flex max-w-xl flex-col rounded-md border border-purple-900 hover:shadow hover:shadow-purple-900"
    >
      <Link href={url}>
        <PrismicNextImage
          field={data.featuredimage}
          className="max-h-36 rounded-t-lg object-cover"
          priority={index === 0}
        />
      </Link>

      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <Link href={url}>
            <Heading
              as="h3"
              size="2xl"
              className="text-brand-secondary mb-2 text-center tracking-tight"
            >
              {prismicH.asText(data.title)}
            </Heading>
            <p className="text-center text-xs">{`Published ${datepublished}`}</p>
          </Link>
        </div>
        <p className="prose mx-auto text-purple-100">
          {prismicH.asText(data.excerpt) || 'Add post excerpt in CMS'}
        </p>
        <Link
          href={url}
          className="my-4 inline-flex items-center self-start rounded-md px-4 py-3 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Read more
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </Comp>
  )
}

export default BlogCard
