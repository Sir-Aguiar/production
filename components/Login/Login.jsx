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
          sessionStorage.setItem('logado',true)
          sessionStorage.setItem('name', username)
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
        <div
          className={`${styles.username_field} ${styles.user_input} ${styles.userdata_input}`}
        >
          <input type="text" placeholder="Nome" defaultValue="" required />
        </div>
        <div
          className={`${styles.userpassword_field} ${styles.user_input} ${styles.userdata_input}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            defaultValue=""
            required
          />
          {showPassword ? (
            <RiEyeLine
              onClick={() => setToggle(!showPassword)}
              className={`${styles.open_eye}`}
            />
          ) : (
            <RiEyeCloseLine onClick={() => setToggle(!showPassword)} />
          )}
        </div>
        <div className={`${styles.submit_field}  ${styles.user_input} `}>
          <input type="submit" value="Entrar" />
        </div>
      </form>
      <ToastContainer autoClose={4000} />
    </div>
  );
}
