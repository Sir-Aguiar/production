import { useEffect, useState } from "react";
import ServicesApi from "../../scripts/ServicesAPI";
import styles from "./styles/main.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import Link from "next/dist/client/link";
import { FaSlideshare } from "react-icons/fa";
export default function Login({ toggleLogin, setLoading, setNome, Path }) {
  const [showPassword, setToggle] = useState(false);
  const [remember, toggleRemember] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll("input");

    getLogins(inputs[0].value, inputs[1].value, false);
  }

  function getLogins(username, userpassword, keepLogin) {
    ServicesApi.post("/services", {
      service: "LOGIN",
      username: username,
      userpassword: userpassword,
    }).then((response) => {
      if (response.data["serviceStatus"] === 0) {
        localStorage.setItem("username", response.data["userName"]);
        localStorage.setItem("userId", response.data["userId"]);
        localStorage.setItem("Nome", response.data["Nome"]);
        localStorage.setItem('remember', remember)
        localStorage.setItem('userTeams', response.data["userTeams"])
        toggleLogin(true);
        
      } else if (response.data["serviceStatus"] === -1) {
        toast.warn("Senha errada ou inválida");
      } else if (response.data["serviceStatus"] === 404) {
        toast.error("Usuário não encontrado ou não existe");
      }
    });
  }

  return (
    <div className={styles.login_parent_container}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.formulary_container}
      >
        <h1>Seja bem-vindo de volta</h1>
        <div className={styles.header}>
          <img
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/12252.png"
            className={styles.header_img}
            id="coiner"
          />
        </div>

        <div className={styles.username_container}>
          <input type="text" placeholder="Nome de usuário" required />
        </div>
        <div className={styles.password_container}>
          <input
            type={showPassword ? "text" : "password"}
            id="password_field"
            placeholder="Senha"
            required
          />
          {showPassword ? (
            <RiEyeLine
              onClick={() => {
                setToggle(!showPassword);
                document.querySelector("#password_field").focus();
              }}
              className={`${styles.open_eye}`}
            />
          ) : (
            <RiEyeCloseLine
              onClick={() => {
                setToggle(!showPassword);
                document.querySelector("#password_field").focus();
              }}
            />
          )}
        </div>
        <div className={styles.line_div}></div>
        <div className={styles.not_account}>
          <Link href="/cadastro">Não possui uma conta?</Link>
        </div>
        <div className={styles.remember_container}>
          <input
            type="checkbox"
            id="remember"
            title="Não recomendado"
            onClick={() => {
              toggleRemember(remember ? false : true);
            }}
          />
          <label htmlFor="remember" title="Não recomendado">
            Manter usuário
          </label>
        </div>
        <div className={styles.submit_container}>
          <input
            type="submit"
            value="Entrar"
            id="submiter"
            onClick={() => {
              const button = document.querySelector("#submiter");
              button.style.transform = `translateY(4px)`;
              setTimeout(() => {
                button.style.transform = ``;
              }, 210);
            }}
          />
        </div>
      </form>
      <ToastContainer autoClose={4000} />
    </div>
  );
}
