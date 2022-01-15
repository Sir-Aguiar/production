import Head from 'next/head'
import Login from '../components/Login/Login'
import { useEffect, useState } from 'react'
import Router from 'next/router'
export default function Home() {
  const [loged, setLoged] = useState(false)
  const [name, setName] = useState('')
  useEffect(() => {
    if (sessionStorage.getItem('logado')) {
      setLoged(sessionStorage.getItem('logado'))
      setName(sessionStorage.getItem('name'))
    }
    else {
      sessionStorage.setItem('logado', name)
      sessionStorage.setItem('name', name)
    }
  })
  function Pushar() {
    Router.push('./home')
  }
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>

      <div className='main-container'>
        {
          loged == 'true' ? (
            Pushar()
          ) : (
            <Login toggleLogin={setLoged} setNome={setName} />
          )
        }
      </div>
    </>
  )
}