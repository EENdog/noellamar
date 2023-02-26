import * as React from 'react'
import Link from 'next/link'

const Footer = ({ sans }) => {
  React.useEffect(() => {
    document.querySelector('#year').innerHTML = new Date().getFullYear()
  }, [])
  return (
    <footer
      className={` mt-auto bg-black py-4 text-neutral-100 md:py-6 lg:py-8 xl:py-10 ${sans.className}`}
    >
      <div
        className={`mx-auto flex max-w-screen-lg flex-wrap items-center justify-center`}
      >
        <div className={`my-4 flex flex-col items-center text-sm`}>
          <p>
            &copy; Copyright <span id="year">checking...</span> Noel Lamar
          </p>
          <p>All Rights Reserved</p>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
