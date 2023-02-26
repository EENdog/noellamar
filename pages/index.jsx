import Head from 'next/head'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading'
import { createClient } from '@/prismicio'
import { components } from '../slices'
import { SliceZone } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'

export default function Home({ navigation, page, siteMetadata }) {
  const {
    data: { sitetitle, siteurl, sitemetadescription, sitemetaimage },
  } = siteMetadata
  return (
    <Layout navigation={navigation}>
      <Head>
        <title>{`${prismicH.asText(sitetitle)}`}</title>
        <link rel="canonical" href={`${siteurl}`} />
        <>
          <meta name="description" content={sitemetadescription} />
          <meta property="og:description" content={sitemetadescription} />
        </>

        <meta property="og:url" content={`${siteurl}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={sitemetaimage.url} />

        <meta property="twitter:card" content="summary_large_image" />

        <meta property="twitter:image" content={sitemetaimage.url} />
        <meta
          name="description"
          content="THIS IS A METADESCRIPTION: REPLACE WITH YOURS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* BUILD YOUR HOMEPAGE HERE */}
      <div className="grid grid-cols-1 gap-y-4 md:gap-y-0">
        <SliceZone slices={page?.data?.slices} components={components} />
      </div>
    </Layout>
  )
}
export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })
  let siteMetadata = {}
  try {
    siteMetadata = await client.getSingle('sitemetadata')
  } catch (error) {
    siteMetadata.data = {
      sitetitle: [{ spans: [], text: 'ADD SITE METADATA', type: 'heading1' }],
      siteurl: 'https://addsitemetadta.com',
      sitemetadescription: 'ADD SITEMETADATA IN PRISMIC',
      sitemetaimage: {
        url: 'https://images.unsplash.com/photo-1599227294320-6de91c96396d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80',
      },
    }
  }
  let navigation = {}
  try {
    navigation = await client.getSingle('mainmenu')
  } catch (error) {
    navigation.data = {}
  }
  let page = {}
  try {
    page = await client.getSingle('homepage')
  } catch (error) {
    page = { data: {} }
  }

  return {
    props: {
      navigation,
      page,
      siteMetadata,
    },
  }
}
