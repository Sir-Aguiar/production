import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from '../components/Login/Login'
import { useState } from 'react'
import Registro from '../components/Registro/Registro';
export default function Home() {
  const [userIsLoged, toggleLogin] = useState(false);
  const [username, setUsername] = useState()
  return (
    <div className={styles.container}>
      <Head>
        <title>Home page</title>
      </Head>
      {
        !userIsLoged ? <Login toggleLogin={toggleLogin} setNome={setUsername} /> : <Registro nome={username} />
        
      }
    </div>
  )
}
