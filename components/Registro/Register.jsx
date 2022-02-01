import styles from "./styles/Register.module.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicesAPI from "../../scripts/ServicesAPI";
export default function Register() {
  const [contas, setContas] = useState([]);
  const [teams, setTeams] = useState(
    localStorage.getItem("userTeams").split(",")
  );
  const [actualTeam, setTeam] = useState(teams[0]);

  const updateTeam = function (teamName) {
    ServicesAPI.post("/services", {
      service: "TEAMINFOS",
      teamName: teamName,
    }).then((response) => {
      if (response.data.serviceStatus == 0) {
        let acc = [];
        for (let index = 1; index <= response.data["accountNumber"]; index++) {
          acc.push(index);
        }
        setContas(acc);
      } else {
        toast.error("Algo deu errado");
      }
    });
  };
  const Logar = () => {};
  const makeRegister = function () {
    let contaDados = [];
    const totalDados = {
      Nome: "",
      Start: 0,
      End: 0,
      Lucro: 0,
    };
    const Iniciais = document.querySelectorAll(".Inicial");
    const Finais = document.querySelectorAll(".Final");
    for (let index = 0; index < Iniciais.length; index++) {
      contaDados.push({
        Nome: localStorage.getItem("username"),
        Start: Number(Iniciais[index].value.replace(",", ".")),
        End: Number(Finais[index].value.replace(",", ".")),
        Lucro:
          Number(Finais[index].value.replace(",", ".")) -
          Number(Iniciais[index].value.replace(",", ".")),
      });
      totalDados.Start += Number(Iniciais[index].value.replace(",", "."));
      totalDados.End += Number(Finais[index].value.replace(",", "."));
      totalDados.Lucro +=
        Number(Finais[index].value.replace(",", ".")) -
        Number(Iniciais[index].value.replace(",", "."));
    }
    ServicesAPI.post("/services", {
      service: "REGISTER",
      teamName: actualTeam,
      userName: localStorage.getItem("username"),
      accountNumber: contas.length,
      DadosContas: contaDados,
      DadosTotal: totalDados,
    }).then((response) => {
      console.log(response.data);
    });
    console.log(totalDados, contaDados);
  };
  return (
    <div className={styles.main_container}>
      <button onClick={makeRegister}>Registrar</button>
      <button onClick={Logar}>Fazer log</button>
      <div className={styles.register_container}>
        <select
          onChange={(e) => {
            updateTeam(e.target.value);
            setTeam(e.target.value);
          }}
        >
          <option value="pick">Escolha seu time</option>
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
        {contas.map((conta, index) => (
          <div className={styles.account_container} key={index}>
            <h2>Conta {index + 1}</h2>
            <div className={styles.accounts}>
              <input
                type="text"
                placeholder="Saldo Inicial"
                className="Inicial"
              />
              <input type="text" placeholder="Saldo Final" className="Final" />
            </div>
          </div>
        ))}
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );
}
