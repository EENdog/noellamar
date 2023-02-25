import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@/prismicio'
import * as prismicH from '@prismicio/helpers'
import Layout from '@/components/Layout'

const BlogPages = ({ posts, siteMetadata }) => {
  const {
    data: { sitetitle, siteurl, sitemetadescription, sitemetaimage },
  } = siteMetadata
  return (
    <Layout>
      <Head>
        <title>{`Blog Page ${posts.page} · ${prismicH.asText(
          sitetitle
        )}`}</title>
        <link rel="canonical" href={`${siteurl}/blog/page/${posts.page}`} />
        <>
          <meta name="description" content={sitemetadescription} />
          <meta property="og:description" content={sitemetadescription} />
        </>

        <meta
          property="og:url"
          content={`${siteurl}/blog/page/${posts.page}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={sitemetaimage.url} />

        <meta property="twitter:card" content="summary_large_image" />

        <meta property="twitter:image" content={sitemetaimage.url} />
      </Head>
      <ul>
        {posts.results.map((post, i) => {
          return (
            <li key={post.id + i}>
              <Link href={post.url}>{prismicH.asText(post.data.title)}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}
export default BlogPages

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData })
  const pageNumber = Number(params.page)
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
      blogpostsperpage: 1,
    }
  }
  if (isNaN(pageNumber)) {
    return {
      notFound: true,
    }
  }
  if (pageNumber === 1) {
    return {
      redirect: {
        destination: '/blog/',
        permanent: false,
      },
    }
  }
  const posts = await client.getByType('post', {
    pageSize: siteMetadata.data.blogpostsperpage,
    page: pageNumber,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  })
  if (!posts.results.length) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      posts,
      siteMetadata,
    },
  }
}

export async function getStaticPaths() {
  const client = createClient()
  let siteMetadata = {}
  try {
    siteMetadata = await client.getSingle('sitemetadata')
  } catch (error) {
    siteMetadata.data = { blogpostsperpage: 1 }
  }
  const posts = await client.getByType('post', {
    pageSize: siteMetadata.data.blogpostsperpage,
  })
  if (posts.results.length < 6) {
    return {
      paths: posts.results.map((_, i) => `/blog/page/${i + 2}/`),
      fallback: 'blocking',
    }
  }
  return {
    paths: Array.from({ length: 5 }).map((_, i) => `/blog/page/${i + 2}/`),
    fallback: 'blocking',
  }
}
