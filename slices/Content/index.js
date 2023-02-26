import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.ContentSlice} ContentSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContentSlice>} ContentProps
 * @param { ContentProps }
 */
const Content = ({ slice }) => {
  switch (slice.variation) {
    default:
      return (
        <section
          className={`prose mx-auto p-4 md:prose-lg lg:prose-xl xl:prose-2xl prose-headings:text-purple-200 prose-p:text-purple-100`}
        >
          <PrismicRichText field={slice.primary.content} />
        </section>
      )
  }
}

export default Content
