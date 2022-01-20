import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/main.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

export default function Login(props) {
  const [showPassword, setToggle] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll("input");
    getLogins(inputs[0].value, inputs[1].value);
  }

  function getLogins(username, userpassword) {
    axios
      .post("https://production-jet.vercel.app/api/services", {
        service: "LOGIN",
        username: username,
        userpass: userpassword,
      })
      .then((response) => {
        if (response.data.message == "Válido") {
          props.toggleLogin(true);
          props.setNome(username);
          sessionStorage.setItem("logado", true);
          sessionStorage.setItem("name", username);
        } else if (response.data.message == "Inválido") {
          toast.warn("Erro ao realizar login: Verifique seus dados");
        }
      });
  }

  return (
    <div className={styles.login_parent_container}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={styles.formulary_container}
      >
        <h1>Conecte-se a plataforma</h1>
        <div className={styles.header}>
          <img
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/12252.png"
            className={styles.header_img}
            id='coiner'
          />
        </div>

        <div className={styles.username_container}>
          <input type="text" placeholder="Nome de usuário" />
        </div>
        <div className={styles.password_container}>
          <input
            type={showPassword ? "text" : "password"}
            id="password_field"
            placeholder="Senha"
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
        {/* <div className={styles.remember_container}>
          <input type="checkbox" id="remember" title="Não recomendado" />
          <label htmlFor="remember" title="Não recomendado">
            Manter usuário
          </label>
        </div> */}
        <div className={styles.submit_container}>
          <input
            type="submit"
            value="Entrar"
            id="submiter"
            onClick={() => {
              const coin = document.getElementById('coiner')
              coin.style.transform =
                coin.style.transform == `rotateZ(360deg)`
                  ? `rotateZ(0deg)`
                  : `rotateZ(360deg)`;
            }}
          />
        </div>
      </form>
      <ToastContainer autoClose={4000} />
    </div>
  );
}
