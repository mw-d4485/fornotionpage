import Head from 'next/head'
import { useRouter } from 'next/router'

export default function NotionProxyPage() {
  const router = useRouter()
  const { slug } = router.query

  const notionPageMap: Record<string, string> = {
    'shanghai-restaurants': 'https://harmless-shawl-5df.notion.site/29d257067ae480de9a2eee0b7f671536',
    //'beijing-coffee': 'https://your-notion-url.notion.site/another-page-id',
    //'travel-notes': 'https://your-notion-url.notion.site/yet-another-page-id'
  }

  const notionURL = notionPageMap[slug as string]

  if (!notionURL) {
    return (
      <>
        <Head>
          <title>404 | Page Not Found</title>
        </Head>
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <h1>🚫 Page Not Found</h1>
          <p>We couldn’t find the Notion page for: <code>{slug}</code></p>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{slug} | My Notion Proxy</title>
        <meta name="description" content={`Redirecting to Notion page for ${slug}`} />
      </Head>
      <iframe
        src={notionURL}
        style={{ width: '100%', height: '100vh', border: 'none' }}
        loading="lazy"
      />
    </>
  )
}
