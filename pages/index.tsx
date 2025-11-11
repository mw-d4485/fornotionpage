import Head from 'next/head'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>My Notion Proxy</title>
        <meta name="description" content="Fast access to your Notion pages via custom domain" />
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>📚 My Notion Pages</h1>
        <ul style={{ lineHeight: '2' }}>
          <li><Link href="/shanghai-restaurants">🍜 Shanghai Restaurant Guide</Link></li>
          //<li><Link href="/beijing-coffee">☕ Beijing Coffee Spots</Link></li>
          //<li><Link href="/travel-notes">🧳 My Travel Notes</Link></li>
        </ul>
      </main>
    </>
  )
}
