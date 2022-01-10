import { useEffect, useState } from "react";
import styles from "./Pesquisar.module.css";
import axios from "axios";
export default function Pesquisar(props) {
  
  return (
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
            {props.dados.map((regi) => (
              <tr>
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
  );
}
