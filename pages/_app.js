import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Head>
        <link rel="shortcut icon" href="https://cdn.iconscout.com/icon/free/png-256/diamond-1136-1093491.png" />
      </Head>
      <Component {...pageProps} />
      
    </>
  )
}

export default MyApp
