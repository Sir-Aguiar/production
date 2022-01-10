import styles from "./styles/Register.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Contas from "./components/Contas";
import Tables from "./components/Tables";

export default function Registro(props) {
  const [Conta1_i, setConta1_i] = useState(0);
  const [Conta1_f, setConta1_f] = useState(0);

  const [Conta2_i, setConta2_i] = useState(0);
  const [Conta2_f, setConta2_f] = useState(0);

  const [Conta3_i, setConta3_i] = useState(0);
  const [Conta3_f, setConta3_f] = useState(0);

  const [Conta4_i, setConta4_i] = useState(0);
  const [Conta4_f, setConta4_f] = useState(0);

  const [total, setTotal] = useState(0);
  const [farm, setFarm] = useState(0);
  const [media, setMedia] = useState(0);

  const data = new Date();
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
    setMedia((farm / 12).toFixed(2));
  }
  function Registrar() {
    axios
      .post("https://production-jet.vercel.app/api/registro", {
        identifier: `${data.getDay()}${data.getUTCDate()}:${data.getHours()}${data.getMinutes()}${data.getSeconds()}`,
        nome: props.nome,
        c1_i: Conta1_i,
        c1_f: Conta1_f,
        c2_i: Conta2_i,
        c2_f: Conta2_f,
        c3_i: Conta3_i,
        c3_f: Conta3_f,
        c4_i: Conta4_i,
        c4_f: Conta4_f,
        tota: total,
        farm: farm,
        media: (farm / 12).toFixed(2),
      })
      .then((response) => {
        console.log(response.data);
      });
  }
  const [dados, setDados] = useState();
  function Query() {
    axios
      .post("https://production-jet.vercel.app/api/pesquisas", {
        nome: props.nome,
      })
      .then((response) => {
        console.log(response.data);
        setDados(response.data);
        console.log(dados);
      });
  }
  return (
    <div className={styles.parent_parent_container}>
      <div className={styles.parent_container}>
        <div className={`${styles.contas_container}`}>
          <Contas index={1} setconta_i={setConta1_i} setconta_f={setConta1_f} />
          <Contas index={2} setconta_i={setConta2_i} setconta_f={setConta2_f} />
          <Contas index={3} setconta_i={setConta3_i} setconta_f={setConta3_f} />
          <Contas index={4} setconta_i={setConta4_i} setconta_f={setConta4_f} />
          <div className={styles.account_infos}>
            <p>Total: {total}</p> <p>Total farmado: {farm}</p>{" "}
            <p>BCOIN/hora: {(farm / 12).toFixed(2)}</p>
          </div>
          <div className={styles.actions}>
            <button onClick={() => Registrar()}>Registrar</button>
            <button onClick={() => Calcular()}>Calcular</button>
            <button onClick={() => Query()}>Pesquisar</button>
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
            nome={props.nome}
          />
        </div>
      </div>
      <div className={styles.data_table}>
        {dados ? (
          <table border="1">
            <thead className={styles.table_head}>
              <tr>
                <th>id</th>
                <th>Nome</th>
                <th>Conta 1</th>
                <th>Conta 2</th>
                <th>Conta 3</th>
                <th>Conta 4</th>
                <th>Saldo total</th>
                <th>Saldo do turno</th>
                <th>Média/hora</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((regi) => (
                <tr key={regi["_id"]}>
                  <td>{regi["_id"]}</td>
                  <td>{regi["Nome"]}</td>
                  <td>
                    {regi["Conta 1 (Inicial)"]} &rarr; {regi["Conta 1 (Final)"]}
                  </td>
                  <td>
                    {regi["Conta 2 (Inicial)"]} &rarr; {regi["Conta 2 (Final)"]}
                  </td>
                  <td>
                    {regi["Conta 3 (Inicial)"]} &rarr; {regi["Conta 3 (Final)"]}
                  </td>
                  <td>
                    {regi["Conta 4 (Inicial)"]} &rarr; {regi["Conta 4 (Final)"]}
                  </td>
                  <td>{regi["Total geral"]}</td>
                  <td>{regi["Farm total"]}</td>
                  <td>{regi["BCOIN/hora"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1></h1>
        )}
      </div>
    </div>
  );
}
