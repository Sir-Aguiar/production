import Head from 'next/head'
import Login from '../components/Login/Login'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import axios from 'axios'
import Patch from '/components/Updates/Patch'
import Register from '../components/Registro/Register'
import Navbar from '../components/Navigation/Navbar'
import styles from '../styles/Home.module.css'
export default function Home() {
  const [loged, setLoged] = useState(false)
  const [name, setName] = useState('')
  const [currentWindow, setWindow] = useState('registro')

  return (
    <>
      <Head>
        <title>{loged ? 'Home page' : 'Login Page'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <meta charset="UTF-8" />
        {/* <meta name="theme-color" content="#23232e"/> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@300&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </Head>


      {
        loged ? (
          <main className={styles.main_container}>
            <Navbar exitCommand={setLoged} Path={setWindow} />
            {
              currentWindow == 'registro' && <Register nome={name} />
            }
            {
              currentWindow == 'notas' && <Patch />
            }
          </main>
        ) : (
          <Login toggleLogin={setLoged} setNome={setName} Path={setWindow} />
        )
      }

    </>
  )
}