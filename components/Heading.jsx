import * as React from 'react'
import { Lora } from '@next/font/google'
const serif = Lora({ subsets: ['latin'] })
const Heading = ({ as: Comp = 'h2', size = null, children, className }) => {
  return (
    <Comp
      className={`${serif.className} ${
        size === '7xl'
          ? `text-6xl leading-[5rem] lg:text-7xl lg:leading-[6rem]`
          : size === '6xl'
          ? `text-5xl leading-[4rem] lg:text-6xl lg:leading-[5rem]`
          : size === '5xl'
          ? `text-4xl leading-[3rem] lg:text-5xl lg:leading-[4rem]`
          : size === '4xl'
          ? `text-3xl leading-[2rem] lg:text-4xl lg:leading-[3rem]`
          : size === '3xl'
          ? `text-2xl lg:text-3xl`
          : size === '2xl'
          ? `text-xl lg:text-2xl`
          : size === 'xl'
          ? `text-lg lg:text-xl`
          : ``
      } ${className}`}
    >
      {children}
    </Comp>
  )
}
export default Heading
