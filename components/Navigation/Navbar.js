import Link from "next/link";
import styles from "./styles/Navbar.module.css";
import Router from "next/router";
export default function Navbar(props) {
  function Logout() {
    sessionStorage.setItem("logado", false);
    sessionStorage.setItem("name", '');
    Router.push("/");
  }
  return (
    <nav className={styles.navigation_container}>
      <Link href="/home">Home</Link>
      <Link href="/registro">Registro</Link>
      <button onClick={() => Logout()}>Sair</button>
    </nav>
  );
}
