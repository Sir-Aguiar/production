import { useState } from "react";
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
      .get("https://production-jet.vercel.app/api/teste")
      .then((response) => {
        response.data.forEach((user) => {
          if (user["senha"] === userpassword && user["user"] === username) {
            props.toggleLogin(true);
            toast.success(`Bem-vindo, ${username}`);
            props.setNome(username);
            return;
          }
        });
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
      <ToastContainer autoClose={3000} />
    </div>
  );
}
