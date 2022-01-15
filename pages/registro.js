import Router from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navigation/Navbar";
import Register from '../components/Registro/Registro'

export default function Registro() {

  return (
    <div>
      <Navbar />
      <Register nome={sessionStorage.getItem('name')} />
    </div>
  )
}