import Head from 'next/head'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
export default function Home() {
  useEffect(() => {
    axios.post('https://production-jet.vercel.app/api/teste', {
      nome: 'Felipe'
    })
      .then((response) => {
        console.log(response.data)
      })
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Home page</title>
      </Head>
      <h1>Home page</h1>
    </div>
  )
}
