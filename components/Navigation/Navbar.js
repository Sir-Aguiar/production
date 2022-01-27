import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import Router from "next/router";
import { FaUserAstronaut, FaHistory, FaHome } from 'react-icons/fa'
import { MdCalendarToday } from 'react-icons/md'
import { BiLeftArrow, BiUserCircle } from 'react-icons/bi'
import { ChestCalculator } from "./Chests/ChestCalculator";
export default function Navbar({ exitCommand, Path, RealizeQuery }) {
  const handleLink = function (caminho) {
    Path(caminho);
    activateMenu()
  }
  function activateMenu() {
    const navList = document.querySelector(`.${styles.dropdown}`)
    const arr = document.querySelector(`.${styles.userarrow}`)

    navList.classList.toggle(`${styles.inactive}`)
    arr.classList.toggle(`${styles.inactive}`)
  }

  return (
    <header>
      <nav className={styles.navigation_container}>
        <ChestCalculator />
        <span className={`${styles.userprofile}`} onClick={activateMenu}>
          <FaUserAstronaut size={25} />
          <BiLeftArrow size={15} className={`${styles.userarrow} ${styles.inactive}`} />
        </span>
        <ul className={`${styles.dropdown} ${styles.inactive}`}>
          <li onClick={() => handleLink('perfil')}><BiUserCircle size={36} /> Perfil </li>
          <li onClick={() => handleLink('home')}><FaHome size={32} /> Início</li>
          <li onClick={() => { handleLink('tabelas'); RealizeQuery() }}><FaHistory size={32} /> Histórico</li>
          <li onClick={() => handleLink('registro')}><MdCalendarToday size={32} /> Registro </li>
        </ul>
      </nav>
    </header >
  );
}
