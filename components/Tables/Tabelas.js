import AccountTable from './AccountTable'
import styles from './Tables.module.css'
export default function Tabelas({ dados }) {
  return (
    <>
      <div className={styles.tabelas_container}>
        <h1>Balanço Individual</h1>
        <div className={styles.accounts}>
          <AccountTable index={1} dados={dados} />
          <AccountTable index={2} dados={dados} />
          <AccountTable index={3} dados={dados} />
          <AccountTable index={4} dados={dados} />
        </div>

      </div>
    </>
  )
}