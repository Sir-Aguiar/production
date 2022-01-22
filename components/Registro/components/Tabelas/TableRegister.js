import styles from './TableRegister.module.css'
export default function TableRegister(props) {
  return (
    <table className={styles.table_register}>
      
      <thead>
        <tr>
          <th>Nome</th>
          <th>Conta 1</th>
          <th>Conta 2</th>
          <th>Conta 3</th>
          <th>Conta 4</th>
          <th>Média</th>
          <th>Turno</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.nome}</td>
          <td>
            <span>{props.c1_i}</span>&rarr;<span>{props.c1_f}</span>
          </td>
          <td>
            <span>{props.c2_i}</span>&rarr;<span>{props.c2_f}</span>
          </td>
          <td>
            <span>{props.c3_i}</span>&rarr;<span>{props.c3_f}</span>
          </td>
          <td>
            <span>{props.c4_i}</span>&rarr;<span>{props.c4_f}</span>
          </td>
          <td>{(props.tot / 11).toFixed(2)}</td>
          <td>{props.farm.toFixed(2)}</td>
          <td>{props.tot.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  )
}