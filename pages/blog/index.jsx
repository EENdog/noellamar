import Head from 'next/head'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading'
import { createClient } from '@/prismicio'
import * as prismicH from '@prismicio/helpers'

const BlogIndex = ({ posts, siteMetadata }) => {
  const {
    data: { sitetitle, siteurl, sitemetadescription, sitemetaimage },
  } = siteMetadata
  return (
    <Layout>
      <Head>
        <title>{`Blog · ${prismicH.asText(sitetitle)}`}</title>
        <link rel="canonical" href={`${siteurl}/blog`} />
        <>
          <meta name="description" content={sitemetadescription} />
          <meta property="og:description" content={sitemetadescription} />
        </>

        <meta property="og:url" content={`${siteurl}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={sitemetaimage.url} />

        <meta property="twitter:card" content="summary_large_image" />

        <meta property="twitter:image" content={sitemetaimage.url} />
      </Head>
      <Heading as="h2" size="5xl">
        Blog Index Page 1
      </Heading>
      <code className="my-8 block bg-slate-900 p-8 text-slate-200">{`
        {posts.results.map(post => 
           (
            <article key={post.id}>ETC.</article>
          )
        )}
      `}</code>
      <p>Below is the shape of your post data</p>
      {posts.results.length > 0 ? (
        <code>{JSON.stringify(posts)}</code>
      ) : (
        <p>
          There are no published posts in Prismic. Please go to{' '}
          <a href="https://prismic.io" target="_blank">
            Prismic
          </a>{' '}
          and create some posts.
        </p>
      )}
    </Layout>
  )
}
export default BlogIndex
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
  let posts = {}
  try {
    posts = await client.getByType('post', {
      pageSize: siteMetadata.data.blogpostsperpage,
      page: 1,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    })
  } catch (error) {
    posts.results = []
  }

  return {
    props: {
      posts,
      siteMetadata,
    },
  }
}
