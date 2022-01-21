import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import Router from "next/router";
import { BiNote } from 'react-icons/bi'
export default function Navbar({ exitCommand, Path }) {
  function Logout() {
    Path('login')
    exitCommand(false)
  }
  return (
    <nav className={styles.navigation_container}>
      <span onClick={() => Path('registro')}>Registro</span>
      <span onClick={() => Path('notas')}>Notas</span>
      <button onClick={() => Logout()}>Sair</button>
    </nav>
  );
}
