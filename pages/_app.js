import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (

    <div>
      <Head>
        <link rel="shortcut icon" href="https://cdn.iconscout.com/icon/free/png-256/diamond-1136-1093491.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
