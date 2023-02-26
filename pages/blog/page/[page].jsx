import Head from 'next/head'
import BlogCard from '@/components/BlogCard'
import { createClient } from '@/prismicio'
import * as prismicH from '@prismicio/helpers'
import Layout from '@/components/Layout'
import Heading from '@/components/Heading'
import Pagination from '@/components/Pagination'

const BlogPages = ({ navigation, posts, siteMetadata }) => {
  const {
    data: { sitetitle, siteurl, sitemetadescription, sitemetaimage },
  } = siteMetadata
  return (
    <Layout navigation={navigation}>
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
      <header className="bg-base-100 py-4 text-center md:py-6 lg:py-8 xl:py-10">
        <Heading as="h2" size="4xl">{`Blog: Page ${posts.page}`}</Heading>
      </header>
      <section className="flex flex-col items-center px-4">
        <Pagination {...posts} />
        {posts.results.length > 0 ? (
          <ol className="flex flex-wrap justify-center gap-6">
            {posts.results.map((post, i) => {
              return <BlogCard as="li" key={post.id} {...post} index={i} />
            })}
          </ol>
        ) : (
          <p>No Posts are Published Yet. Check back soon</p>
        )}
      </section>
      <Pagination {...posts} />
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
  let navigation = {}
  try {
    navigation = await client.getSingle('mainmenu')
  } catch (error) {
    navigation.data = {}
  }
  return {
    props: {
      navigation,
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
