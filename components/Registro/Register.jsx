import styles from "./styles/Register.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableRegister from "./components/Tabelas/TableRegister";
import QueryTable from "./components/Tabelas/QueryTable";
import SerachButtons from "./components/SerachButtons/SearchButtons";
import SearchButtons from "./components/SerachButtons/SearchButtons";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import AccountInfos from "./components/AccountInfos";

export default function Register() {
  const Contass = [1, 2, 3, 4, 5];
  const times = ["Discolados"];

  const [Farm, setFarm] = useState(0);
  const [Total, setTotal] = useState(0);
  const [TotalInicial, setTotalInicial] = useState(0);

  return (
    <>
      <div className={styles.parent_container}>
        <div className={`${styles.contas_container}`}>
          <select>
            {times.map((time) => (
              <option value={time.toLowerCase()} key={time}>
                {time}
              </option>
            ))}
          </select>
          {Contass.map((conta, index) => (
            <div className={`${styles.account_field}`} key={index}>
              <h2>Conta {index}</h2>
              <input
                type="text"
                placeholder="Saldo inicial"
                className="inicials"
              />
              <input type="text" placeholder="Saldo final" className="finals" />
            </div>
          ))}

          <AccountInfos farm={Farm} total={Total} />
          <ActionButtons
            setFarm={setFarm}
            setTotal={setTotal}
            setTotalInicial={setTotalInicial}
          />
          <SearchButtons />
        </div>
      </div>
      <ToastContainer autoClose={4000} />
    </>
  );
}
