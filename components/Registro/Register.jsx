import styles from "./styles/Register.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Contas from "./components/Contas";
import Tables from "./components/Tables";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableQuery from "./components/QueryTable";

export default function Register({ nome }) {
  const [dados_iniciais, setDados_iniciais] = useState();
  useEffect(() => {
    setBcoin(sessionStorage.getItem("bomb"));
  });
  const [Conta1_i, setConta1_i] = useState(0);
  const [Conta1_f, setConta1_f] = useState(0);

  const [Conta2_i, setConta2_i] = useState(0);
  const [Conta2_f, setConta2_f] = useState(0);

  const [Conta3_i, setConta3_i] = useState(0);
  const [Conta3_f, setConta3_f] = useState(0);

  const [Conta4_i, setConta4_i] = useState(0);
  const [Conta4_f, setConta4_f] = useState(0);
  const [dados, setDados] = useState();
  const [total, setTotal] = useState(0);
  const [farm, setFarm] = useState(0);
  const [total_inicial, setInit] = useState(0);
  const data = new Date();
  const [BCOIN, setBcoin] = useState(0);

  function Calcular() {
    setTotal(
      Number(Conta1_f) + Number(Conta2_f) + Number(Conta3_f) + Number(Conta4_f)
    );
    setFarm(
      Number(Conta1_f) +
        Number(Conta2_f) +
        Number(Conta3_f) +
        Number(Conta4_f) -
        (Number(Conta1_i) +
          Number(Conta2_i) +
          Number(Conta3_i) +
          Number(Conta4_i))
    );
    setInit(
      (
        Number(Conta1_i) +
        Number(Conta2_i) +
        Number(Conta3_i) +
        Number(Conta4_i)
      ).toFixed(2)
    );
  }
  function Registrar() {
    axios
      .post("https://production-jet.vercel.app/api/services", {
        identifier: `${data.getDate()}${
          data.getMonth() + 1
        }:${data.getHours()}`,
        service: "REGISTER",
        nome: nome,
        c1_i: Number(Conta1_i).toFixed(2),
        c1_f: Number(Conta1_f).toFixed(2),
        c2_i: Number(Conta2_i).toFixed(2),
        c2_f: Number(Conta2_f).toFixed(2),
        c3_i: Number(Conta3_i).toFixed(2),
        c3_f: Number(Conta3_f).toFixed(2),
        c4_i: Number(Conta4_i).toFixed(2),
        c4_f: Number(Conta4_f).toFixed(2),
        tota: Number(total).toFixed(2),
        tota_i: Number(total_inicial).toFixed(2),
        farm: farm.toFixed(2),
        media: Number(farm / 12).toFixed(2),
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "Houve um erro") {
          toast.error(
            "Você excedeu o limite de registros permitidos, tente novamente mais tarde."
          );
        }
        if (response.data.message == "Inserido com sucesso") {
          toast.success("Registro realizado com sucesso");
        }
      });
  }

  function Query() {
    const name_to_search = document.querySelector(".nametosearch");
    axios
      .post("https://production-jet.vercel.app/api/services", {
        service: "PESQUISAR",
        nome: name_to_search.value != "" ? name_to_search.value : nome,
      })
      .then((response) => {
        setDados(response.data);
        if (response.data) {
          if (response.data.length < 1) {
            toast.warning("Busque por um nome válido");
          }
        }
      });
  }
  function QueryLast() {
    axios
      .post("https://production-jet.vercel.app/api/services", {
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
          setConta1_i(last["Conta 1 (Final)"]);
          setConta2_i(last["Conta 2 (Final)"]);
          setConta3_i(last["Conta 3 (Final)"]);
          setConta4_i(last["Conta 4 (Final)"]);
        }
      });
  }
  return (
    <>
      <div className={styles.parent_container}>
        <div className={`${styles.contas_container}`}>
          <Contas index={1} setconta_i={setConta1_i} setconta_f={setConta1_f} />
          <Contas index={2} setconta_i={setConta2_i} setconta_f={setConta2_f} />
          <Contas index={3} setconta_i={setConta3_i} setconta_f={setConta3_f} />
          <Contas index={4} setconta_i={setConta4_i} setconta_f={setConta4_f} />

          <div className={styles.account_infos}>
            <p title="Saldo presente nas contas">
              Saldo: {total.toFixed(2)} &rarr;
              {`R$${(total * Number(BCOIN)).toFixed(2)}`}
            </p>
            <p title="Quanto você lucrou em seu turno">
              Turno: {farm.toFixed(2)} &rarr;
              {`R$${(farm * Number(BCOIN)).toFixed(2)}`}
            </p>
            <p title="Sua média de lucro nas últimas 12 horas">
              Média: {(farm / 12).toFixed(2)} Bcoin/hora
            </p>
            <p title="Cotação da moeda (consultado no momento de seu login)">
              Cotação: {`R$${Number(BCOIN).toFixed(2)}`}
            </p>
            <p className={styles.percentage} title="Sua porcentagem">
              Seus 10%: {(total / 10).toFixed(2)} &rarr;
              {`R$${((total / 10) * Number(BCOIN)).toFixed(2)}`}
            </p>
          </div>
          <div className={styles.actions}>
            <div className={styles.important_buttons}>
              <button
                onClick={() => Calcular()}
                title="Aperte para processar os dados inseridos "
              >
                Calcular
              </button>
              <button
                onClick={() => Registrar()}
                title="Insira seu registro no banco de dados"
              >
                Registrar
              </button>
            </div>

            <input
              type="text"
              placeholder="Pesquisar registros de"
              className={`${styles.nametosearch} nametosearch`}
            />
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
          </div>
        </div>
        <div className={styles.table_container}>
          <Tables
            c1_i={Conta1_i}
            c1_f={Conta1_f}
            c2_i={Conta2_i}
            c2_f={Conta2_f}
            c3_i={Conta3_i}
            c3_f={Conta3_f}
            c4_i={Conta4_i}
            c4_f={Conta4_f}
            farm={farm}
            total={total}
            nome={nome}
            inicial={total_inicial}
          />
        </div>
      </div>
      <div className={styles.data_table}>
        <TableQuery dados={dados} />
      </div>
      <ToastContainer autoClose={4000} />
    </>
  );
}
