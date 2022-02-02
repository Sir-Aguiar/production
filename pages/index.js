import Head from 'next/head'
import Login from '../components/Login/Login'
import { useEffect, useState } from 'react'
import Profile from '../components/Profile/Profile'
import Register from '../components/Registro/Register'
import Navbar from '../components/Navigation/Navbar'
import styles from '../styles/Home.module.css'
import Tabelas from '../components/Tables/Tabelas'
import axios from 'axios'
import ServicesApi from '../scripts/ServicesAPI'
import Loading from '../components/Loading/Loading'
export default function Home() {
  const [loged, setLoged] = useState(false)
  const [name, setName] = useState('')
  const [currentWindow, setWindow] = useState('registro')
  const [queryData, setQD] = useState()
  const [loading, setLoading] = useState(false)
  function Logout() {
    setLoged(false)
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem('userTeams')
    localStorage.removeItem("Nome");
    localStorage.removeItem('remember')
  }
  useEffect(() => {
    if (loged === false) {

      if (localStorage.getItem('remember') && localStorage.getItem('remember') == 'true') {
        setLoading(true)
        ServicesApi.post('', {
          service: 'LOGIN',
          username: localStorage.getItem('username'),
          identificador: localStorage.getItem('userId')
        }).then(response => {
          if (response.data['serviceStatus'] === 0) {
            localStorage.setItem("username", response.data["userName"]);
            localStorage.setItem("Nome", response.data["Nome"]);
            localStorage.setItem('userTeams', response.data["userTeams"])
            setLoged(true)
            setLoading(false)
          } else if (response.data["serviceStatus"] === -1 || response.data["serviceStatus"] === 404) {
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            localStorage.removeItem("Nome");
            localStorage.removeItem('userTeams')
            localStorage.removeItem('remember')
            setLoading(false)
            setLoged(false)
          }
        })
      }
      else if (localStorage.getItem('remember') && localStorage.getItem('remember') != 'true') {
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem('userTeams')
        localStorage.removeItem("Nome");

      }
    }
  }, [])
  return (
    <>
      <Head>
        <title>{loged ? 'Home page' : 'Login Page'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        <meta charSet="UTF-8" />
        {/* <meta name="theme-color" content="#23232e"/> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@300&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </Head>


      {
        loged ? (
          <main className={styles.main_container}>
            <Navbar exitCommand={Logout} Path={setWindow} />
            {
              currentWindow == 'registro' && <Register nome={name} />
            }
            {
              currentWindow == 'perfil' && <Profile />
            }
            {
              currentWindow == 'tabelas' && <Tabelas dados={queryData} />
            }
          </main>
        ) : (
          loading ? <Loading containerSize={100} loadingSize={60} loading={true
          } /> : <Login toggleLogin={setLoged} setNome={setName} Path={setWindow} />
        )
      }

    </>
  )
}