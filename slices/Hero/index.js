import React from 'react'
import { Cinzel_Decorative } from '@next/font/google'
import { PrismicLink, PrismicRichText } from '@prismicio/react'
import Image from 'next/image'
import Heading from '@/components/Heading'

const cinzel_decorative = Cinzel_Decorative({
  weight: '400',
  subsets: ['latin'],
})

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param { HeroProps }
 */
const Hero = ({ slice }) => {
  return (
    <section className="relative flex min-h-[400px] items-center justify-center py-6">
      <Image
        src={slice.primary.backgroundimage.url}
        alt=""
        fill
        className="z-0 object-cover"
      />
      <div className="absolute inset-0 z-0 bg-purple-900 bg-opacity-30" />
      <div className="absolute inset-0 z-0 bg-slate-900 bg-opacity-80" />
      <div className="flex flex-col items-center justify-center px-4">
        <div className="z-10 mx-auto my-4 max-w-screen-xl">
          <PrismicRichText
            field={slice.primary.heroheading}
            components={{
              heading2: ({ children }) => (
                <Heading
                  as="h2"
                  size="6xl"
                  className={`neon text-center text-purple-50`}
                >
                  {children}
                </Heading>
              ),
              heading3: ({ children }) => (
                <h3
                  className={`neon text-center text-5xl text-purple-50 ${cinzel_decorative.className}`}
                >
                  {children}
                </h3>
              ),
            }}
          />
        </div>
        <div className="z-10 mx-auto max-w-screen-sm">
          <PrismicRichText
            field={slice.primary.herodescription}
            components={{
              paragraph: ({ children }) => (
                <p className={`my-4 text-purple-100 md:text-lg lg:text-xl`}>
                  {children}
                </p>
              ),
            }}
          />
        </div>
        {slice.items.length > 0 && (
          <div className="z-10 flex flex-col justify-evenly gap-y-4 lg:flex-row lg:gap-y-0 lg:gap-x-6">
            {slice.items.map((button, i) => (
              <PrismicLink
                key={slice.id + i}
                field={button.herobuttonlink}
                className={`rounded-md border border-purple-300 bg-black bg-opacity-30 py-3 px-4 text-center text-purple-300 transition duration-300 ease-in-out hover:border-purple-50 hover:bg-opacity-50 hover:text-purple-50`}
              >
                {button.herobuttontext}
              </PrismicLink>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
