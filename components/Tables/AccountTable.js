import styles from './AccountTable.module.css'
export default function ({ dados, index }) {
  return (
    <div className={styles.account_container}>
      <h1>Conta {index}</h1>
      <div className={styles.tables}>
        <table>

          <thead>
            <tr>
              <th>Data</th>
              <th>Início</th>
              <th>Final</th>
              <th>Lucro</th>
            </tr>
          </thead>
          <tbody>
            {
              dados && dados.length > 0 && dados.map(dado => (
                <tr key={dado['_id']}>
                  <td>{dado['_id']}</td>
                  <td>{dado[`Conta ${index} (Inicial)`]}</td>
                  <td>{dado[`Conta ${index} (Final)`]}</td>

                  <td>{(Number(dado[`Conta ${index} (Final)`]) - Number(dado[`Conta ${index} (Inicial)`])).toFixed(2)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}