import styles from '../styles/AccountInfos.module.css'

export default function AccountInfos({ farm = 0, total = 0 }) {
  return (
    <div className={styles.account_infos}>
      <p title="Saldo presente nas contas">
        Saldo: {Number(total).toFixed(2)} Bcoin
      </p>
      <p title="Quanto você lucrou em seu turno">
        Turno: {farm.toFixed(2)} Bcoin
      </p>
    </div>
  )
}