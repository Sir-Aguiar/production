import Navbar from "../components/Navigation/Navbar";
import { useEffect } from 'react'
import { Router } from "next/router";
export default function Home(props) {
  useEffect(() => {
    window.alert('Esta página ainda não pode ser acessada por usuários')
    Router.push('/registro')
  })
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
    </div>
  )
}