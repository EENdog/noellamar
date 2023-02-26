import { SliceZone, PrismicRichText } from '@prismicio/react'
import * as prismicH from '@prismicio/helpers'
import Head from 'next/head'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import Layout from '@/components/Layout'
import BlogCard from '@/components/BlogCard'
import Pagination from '@/components/Pagination'

const Page = ({ footer, navigation, page, posts, siteMetadata }) => {
  const { data } = page

  return (
    <Layout navigation={navigation} footer={footer}>
      <Head>
        <title>{`${prismicH.asText(data.title)} · ${prismicH.asText(
          siteMetadata.data.sitetitle
        )}`}</title>
        <link
          rel="canonical"
          href={
            data.canonicalurl || `${siteMetadata.data.siteurl}/${page.url}/`
          }
        />
        {data.metadescription ||
          (siteMetadata.data.sitemetadescription && (
            <meta
              name="description"
              content={
                data.metadescription || siteMetadata.data.sitemetadescription
              }
            />
          ))}
        {data.metadescription ||
          (siteMetadata.data.sitemetadescription && (
            <meta
              property="og:description"
              content={
                data.metadescription || siteMetadata.data.sitemetadescription
              }
            />
          ))}
        <meta
          property="og:url"
          content={
            data.canonicalurl || `${siteMetadata.data.siteurl}/${page.url}/`
          }
        />
        <meta property="og:type" content="website" />

        {data.metaimage.url ||
          (siteMetadata.data.sitemetaimage.url && (
            <meta
              property="og:image"
              content={
                data.metaimage.url || siteMetadata.data.sitemetaimage.url
              }
            />
          ))}

        <meta property="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content={
            data.metadescription || siteMetadata.data.sitemetadescription
          }
        />
        {data.metaimage.url ||
          (siteMetadata.data.sitemetaimage.url && (
            <meta
              property="twitter:image"
              content={
                data.metaimage.url || siteMetadata.data.sitemetaimage.url
              }
            />
          ))}
      </Head>
      <div className="grid grid-cols-1 gap-y-4 md:gap-y-0">
        {!data.hidepagetitle && (
          <header className="bg-base-100 py-4 text-center md:py-6 lg:py-8 xl:py-10">
            <PrismicRichText field={data.title} />
          </header>
        )}
        {data.slices.length > 0 && (
          <SliceZone slices={data.slices} components={components} />
        )}
        {page.url === '/blog' && (
          <section className="flex flex-col items-center px-4">
            {posts.total_pages > 1 && <Pagination {...posts} />}
            {posts.results.length > 0 ? (
              <ol className="flex flex-wrap justify-center gap-6">
                {posts.results.map((post, i) => {
                  return <BlogCard as="li" key={post.id} {...post} index={i} />
                })}
              </ol>
            ) : (
              <p>No Posts are Published Yet. Check back soon</p>
            )}
            {posts.total_pages > 1 && <Pagination {...posts} />}
          </section>
        )}
      </div>
    </Layout>
  )
}
export default Page
export async function getStaticProps({ params, previewData }) {
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
  const page = await client.getByUID('page', params.uid)
  // const footer = await client.getSingle('footer')
  let posts
  if (page.uid === 'blog') {
    posts = await client.getByType('post', {
      pageSize: siteMetadata.data.blogpostsperpage,
      page: 1,
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
        page,
        siteMetadata,
        navigation,
        posts,
      },
    }
  }
  return {
    props: {
      page,
      navigation,
      siteMetadata,
    },
  }
}

export async function getStaticPaths() {
  const client = createClient()
  const pages = await client.getAllByType('page')
  return {
    paths: pages.map(page => prismicH.asLink(page)),
    fallback: false,
  }
}
