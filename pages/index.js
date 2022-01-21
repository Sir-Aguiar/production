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
  const [loged, setLoged] = useState(true)
  const [name, setName] = useState('')
  const [currentWindow, setWindow] = useState('registro')

  return (
    <>
      <Head>
        <title>{loged ? 'Home page' : 'Login Page'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@300&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </Head>


      {
        loged ? (
          <div className={styles.main_container}>
            <Navbar exitCommand={setLoged} Path={setWindow}/>
            {
              currentWindow == 'registro' && <Register nome={name} />
            }
            {
              currentWindow == 'notas' && <Patch />
            }
          </div>
        ) : (
          <Login toggleLogin={setLoged} setNome={setName} Path={setWindow}/>
        )
      }

    </>
  )
}