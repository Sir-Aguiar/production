import styles from "./Tables.module.css";

export default function Tables(props) {
  const data = new Date()
  return (
    <table border="1" className={styles.data_table}>
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
        <tr>
          <td>{data.getDay()}{data.getUTCDate()}:{data.getHours()}{data.getMinutes()}{data.getSeconds()}</td>
          <td>{props.nome}</td>
          <td>
            <span>{props.c1_i}</span> &rarr; <span>{props.c1_f}</span>
          </td>
          <td>
            <span>{props.c2_i}</span> &rarr; <span>{props.c2_f}</span>
          </td>
          <td>
            <span>{props.c3_i}</span> &rarr; <span>{props.c3_f}</span>
          </td>
          <td>
            <span>{props.c4_i}</span> &rarr; <span>{props.c4_f}</span>
          </td>
          <td>{props.total}</td>
          <td>{props.farm}</td>
          <td>{(props.farm / 12).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
}
