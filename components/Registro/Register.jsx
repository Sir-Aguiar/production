import styles from "./styles/Register.module.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicesAPI from "../../scripts/ServicesAPI";
export default function Register() {
  const [contas, setContas] = useState([]);
  const [teams, setTeams] = useState([]);
  const [actualTeam, setTeam] = useState();
  const [Total, setTotal] = useState(0);
  const [Farm, setFarm] = useState(0);
  const data = new Date();
  const year = data.getUTCFullYear();
  const month =
    data.getUTCMonth() > 9 ? data.getUTCMonth() : `0${data.getUTCMonth()}`;
  const day =
    data.getUTCDate() > 9 ? data.getUTCDate() : `0${data.getUTCDate()}`;
  const hour =
    data.getUTCHours() > 9 ? data.getUTCHours() : `0${data.getUTCHours()}`;
  const minutes =
    data.getUTCMinutes() > 9
      ? data.getUTCMinutes()
      : `0${data.getUTCMinutes()}`;
  const date = `${day}/${month}/${year} - ${hour}:${minutes}`;
  let AccountData = {};
  const totalDados = {
    Data: date,
    Nome: localStorage.getItem("username"),
    Start: 0,
    End: 0,
    Lucro: 0,
  };
  useEffect(() => {
    getUserteams();
  }, []);
  const Calcular = () => {
    const Iniciais = document.querySelectorAll(".Inicial");
    const Finais = document.querySelectorAll(".Final");
    let farm = 0;
    for (let index = 1; index <= Iniciais.length; index++) {
      AccountData[`Conta ${index}`] = {
        Nome: localStorage.getItem("username"),
        Start: Number(Iniciais[index - 1].value.replace(",", ".")),
        End: Number(Finais[index - 1].value.replace(",", ".")),
        Lucro:
          Number(Finais[index - 1].value.replace(",", ".")) -
          Number(Iniciais[index - 1].value.replace(",", ".")),
      };
      totalDados.Start += Number(Iniciais[index - 1].value.replace(",", "."));
      totalDados.End += Number(Finais[index - 1].value.replace(",", "."));
      totalDados.Lucro +=
        Number(Finais[index - 1].value.replace(",", ".")) -
        Number(Iniciais[index - 1].value.replace(",", "."));
      farm +=
        Number(Finais[index - 1].value.replace(",", ".")) -
        Number(Iniciais[index - 1].value.replace(",", "."));
    }
    setFarm(farm);
    AccountData["Registros"] = totalDados;
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
        clearInputs();
      } else {
        toast.error("Algo deu errado");
      }
    });
  };
  const makeRegister = function () {
    Calcular();
    ServicesAPI.post("", {
      service: "REGISTER",
      teamName: actualTeam,
      userName: localStorage.getItem("username"),
      Contas: AccountData,
    }).then((response) => {
      if (response.data.serviceStatus == 0) {
        toast.success("Registro realizado com sucesso");
        clearInputs();
      }
    });
  };
  const clearInputs = () => {
    const Iniciais = document.querySelectorAll(".Inicial");
    const Finais = document.querySelectorAll(".Final");
    for (let index = 0; index < Iniciais.length; index++) {
      Iniciais[index].value = "";
      Finais[index].value = "";
    }
  };
  const getData = (teamName) => {
    ServicesAPI.post("", {
      service: "QUERY",
      userName: localStorage.getItem("username"),
      teamName: teamName,
    }).then((response) => {
      let lucrototal = 0;

      response.data.Geral.forEach((item) => {
        lucrototal += item.Lucro;
      });
      setTotal(lucrototal);
    });
  };
  const getLast = () => {
    ServicesAPI.post("", {
      service: "QUERY",
      userName: localStorage.getItem("username"),
      teamName: actualTeam,
    }).then((response) => {
      const Iniciais = document.querySelectorAll(".Inicial");
      const Finais = document.querySelectorAll(".Final");
      if (response.data.Accounts.length > 0) {
        for (let index = 0; index < response.data.Accounts.length; index++) {
          Iniciais[index].value =
            response.data.Accounts[index][
              response.data.Accounts[index].length - 1
            ].End;
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
              if (e.target.value != "vazio") {
                updateTeam(e.target.value);
                setTeam(e.target.value);
                getData(e.target.value);
                setTotal(0);
                setFarm(0);
              } else {
                setTeam("");
              }
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
              <p title="O primeiro valor representa o saldo inicial, e segundo o saldo final">
                Saldo: {Total.toFixed(2)} -{" "}
                {Farm > 0 && Number(Total.toFixed(2)) + Number(Farm.toFixed(2))}
              </p>
              <p title="O quanto foi lucrado desde o último registro">
                Farm: {Farm.toFixed(2)}
              </p>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => {
                  const button = document.querySelectorAll(
                    `.${styles.actions} button`
                  );
                  makeRegister();
                  button[0].style.transform = `translateY(2px)`;
                  setTimeout(() => {
                    button[0].style.transform = ``;
                  }, 210);
                }}
              >
                Registrar
              </button>
              <button
                onClick={() => {
                  const button = document.querySelectorAll(
                    `.${styles.actions} button`
                  );
                  Calcular();
                  button[1].style.transform = `translateY(2px)`;
                  setTimeout(() => {
                    button[1].style.transform = ``;
                  }, 210);
                }}
              >
                Calcular
              </button>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => {
                  const button = document.querySelectorAll(
                    `.${styles.actions} button`
                  );
                  getLast();
                  button[2].style.transform = `translateY(2px)`;
                  setTimeout(() => {
                    button[2].style.transform = ``;
                  }, 210);
                }}
                className={styles.lastButton}
              >
                Último registro
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer autoClose={4000} />
    </div>
  );
}
