
import styles from "./styles/Register.module.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicesAPI from "../../scripts/ServicesAPI";
export default function Register() {
  const [contas, setContas] = useState([]);
  const [teams, setTeams] = useState([]);
  const [actualTeam, setTeam] = useState();
  const data = new Date();
  const year = data.getUTCFullYear();
  const month =
    data.getUTCMonth() > 9 ? data.getUTCMonth() : `0${data.getUTCMonth()}`;
  const day =
    data.getUTCDate() > 9 ? data.getUTCDate() : `0${data.getUTCDate()}`;
  const hour =
    data.getUTCHours() > 9 ? data.getUTCHours() : `0${data.getUTCHours()}`;
  const minutes =
    data.getUTCMinutes() > 9 ? data.getUTCMinutes() : `0${data.getUTCHours()}`;
  const date = `${day}/${month}/${year} - ${hour}:${minutes}`;
  let contaDados = [];
  const totalDados = {
    Data: date,
    Nome: localStorage.getItem("username"),
    Start: 0,
    End: 0,
    Lucro: 0,
  };
  useEffect(() => {
    getUserteams();
    setInterval(() => {
      console.log(process.env.REACT_APP_NOT_SECRET_CODE)
    }, 2000);
  }, []);
  const Calcular = () => {
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
    console.log(totalDados, contaDados);
  };
  const getUserteams = function () {
    ServicesAPI.post("", {
      service: "GETEAMS",
      userName: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.status == 200) {
        let usert = [];
        response.data.userTeams.forEach((time) => {
          usert.push(time.teamName);
        });
        setTeams(usert);
      }
    });
  };

  const updateTeam = function (teamName) {
    ServicesAPI.post("", {
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
  const makeRegister = function () {
    ServicesAPI.post("", {
      service: "REGISTER",
      teamName: actualTeam,
      userName: localStorage.getItem("username"),
      accountNumber: contas.length,
      DadosContas: contaDados,
      DadosTotal: totalDados,
    }).then((response) => {
      console.log(response.data);
      if (response.data.serviceStatus == 0) {
        toast.success("Registro realizado com sucesso");
        const Iniciais = document.querySelectorAll(".Inicial");
        const Finais = document.querySelectorAll(".Final");
        for (let index = 0; index < Iniciais.length; index++) {
          Iniciais[index].value = "";
          Finais[index].value = "";
        }
      }
    });
    
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.register_container}>
        <div className={styles.selector_container}>
          <select
            onChange={(e) => {
              updateTeam(e.target.value);
              setTeam(e.target.value);
            }}
          >
            <option value="vazio">Escolha seu time</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {actualTeam && actualTeam != "vazio" && (
          <>
            <div className={styles.accountContainers}>
              {contas.map((conta, index) => (
                <div className={styles.account_container} key={index}>
                  <h2>Conta {index + 1}</h2>
                  <div className={styles.accounts}>
                    <input
                      type="text"
                      placeholder="Saldo Inicial"
                      className="Inicial"
                    />
                    <input
                      type="text"
                      placeholder="Saldo Final"
                      className="Final"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.registerInfos}>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <div className={styles.actions}>
              <button onClick={makeRegister}>Registrar</button>
              <button onClick={Calcular}>Calcular</button>
            </div>
          </>
        )}
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );
}
