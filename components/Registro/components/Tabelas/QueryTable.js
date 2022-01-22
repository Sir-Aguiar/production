import styles from './QueryTable.module.css'
export default function QueryTable({ dados }) {
  return (
    <div className={styles.query_table}>
      <table>
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
          {dados.map((dado) => (
            <tr key={dado['_id']}>
              <td>{dado["Nome"]}</td>
              <td>
                <span>{dado["Conta 1 (Inicial)"]}</span> &rarr;
                <span>{dado["Conta 1 (Final)"]}</span>
              </td>
              <td>
                <span>{dado["Conta 2 (Inicial)"]}</span> &rarr;
                <span>{dado["Conta 2 (Final)"]}</span>
              </td>
              <td>
                <span>{dado["Conta 3 (Inicial)"]}</span> &rarr;
                <span>{dado["Conta 3 (Final)"]}</span>
              </td>
              <td>
                <span>{dado["Conta 4 (Inicial)"]}</span> &rarr;
                <span>{dado["Conta 4 (Final)"]}</span>
              </td>
              <td>{dado["BCOIN/hora"]}</td>
              <td>{dado["Farm total"]}</td>
              <td>{dado["Saldo"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}