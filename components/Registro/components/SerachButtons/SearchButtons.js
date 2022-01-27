import styles from './SearchButtons.module.css'
import axios from 'axios'
export default function SearchButtons({ setDados, setContas }) {

  const Query = () => {
    const name_to_search = document.querySelector(".nametosearch");
    axios
      .post("http://localhost:3000/api/services", {
        service: "PESQUISAR",

        nome: 'Felipe Aguiar'
        /* nome: name_to_search.value != "" ? name_to_search.value : nome */,
      })
      .then((response) => {

        if (response.data) {
          if (response.data.length > 1) {
            setDados(response.data);
          }
        }
      });
  }
  const QueryLast = () => {
    axios
      .post("http://localhost:3000/api/services", {
        service: "PESQUISAR TUDO",
      })
      .then((response) => {
        const iniciais = document.querySelectorAll(".incials");
        const last = response.data[response.data.length - 1];
        if (iniciais.length > 0) {
          iniciais[0].value = last["Conta 1 (Final)"];
          iniciais[1].value = last["Conta 2 (Final)"];
          iniciais[2].value = last["Conta 3 (Final)"];
          iniciais[3].value = last["Conta 4 (Final)"];
          setContas[0](last["Conta 1 (Final)"]);
          setContas[1](last["Conta 2 (Final)"]);
          setContas[2](last["Conta 3 (Final)"]);
          setContas[3](last["Conta 4 (Final)"]);
        }
      });
  }

  return (
    <div className={styles.important_buttonstwo}>
      <button
        onClick={() => Query()}
        className={styles.search_button}
        title="Pesquise o nome inserido na caixa de texto, ou deixe vazia para pesquisar seus registros"
      >
        Pesquisar
      </button>
      <button
        onClick={() => QueryLast()}
        className={styles.last_button}
        title="Complete os campos de valores inicais com base no último registro"
      >
        Último
      </button>
    </div>
  )
}