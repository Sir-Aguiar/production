import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import Router from "next/router";
import { BiNote } from 'react-icons/bi'
export default function Navbar({ exitCommand, Path, RealizeQuery }) {
  function Logout() {
    Path('login')
    exitCommand(false)
  }
  function activateMenu() {
    const mobileMenu = document.querySelector(`.${styles.mobile_menu}`)
    const navList = document.querySelector(`.${styles.nav_list}`)
    const activeClass = `${styles.active}`
    const navLinks = document.querySelectorAll(`.${styles.nav_list} li`)
    function animateLinks() {
      navLinks.forEach((link, index) => {
        link.style.animation ? link.style.animation = '' : link.style.animation = `navLinkFade .5s ease forwards ${((index / 7) + 0.3)}s`
      })
    }

    navList.classList.toggle(activeClass)
    mobileMenu.classList.toggle(activeClass)
    animateLinks()

  }
  return (
    <header>
      <nav className={styles.navigation_container}>
        <Link href='/' ><span className={styles.logo}><img src='https://bombcryptosimulator.com/img/minticon.png' /></span></Link>

        <div className={styles.mobile_menu} onClick={() => activateMenu()}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
        <ul className={styles.nav_list}>
          <li><Link href='/'>Início</Link></li>
          <li onClick={() => { Path('registro'); activateMenu() }} ><Link href='/' >Registro</Link></li>
          <li onClick={() => { Path('notas'); activateMenu() }} > <Link href='/' >Notas</Link></li>
          <li onClick={() => { Path('tabelas'); activateMenu(); RealizeQuery() }} > <Link href='/' >Consultar</Link></li>
        </ul>
      </nav>
    </header>
  );
}
