import Router from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navigation/Navbar";
import Register from '../components/Registro/Register'

export default function Registro() {
  const [name, setName] = useState(null)
  useEffect(() => {
    setName(sessionStorage.getItem('name'))
  })
  return (
    <div>
      <Navbar />
      <Register nome={name} />
    </div>
  )
}