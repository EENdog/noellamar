import React from 'react'
import { PrismicRichText } from '@prismicio/react'

/**
 * @typedef {import("@prismicio/client").Content.ContentSlice} ContentSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContentSlice>} ContentProps
 * @param { ContentProps }
 */
const Content = ({ slice }) => (
  <section className={`p-4`}>
    <PrismicRichText field={slice.primary.content} />
  </section>
)

export default Content
