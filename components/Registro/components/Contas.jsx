import styles from "./Contas.module.css";
export default function Contas(props) {
  return (
    <div className={`${styles.account_field}`}>
      <h2>Conta {props.index}</h2>
      <input
        type="text"
        placeholder="Saldo inicial"
        onChange={(e) => {
          props.setconta_i((e.target.value).replace(',','.'))
        }}
        className="incials"
      />
      <input
        type="text"
        placeholder="Saldo final"
        onChange={(e) => {
          props.setconta_f((e.target.value).replace(',','.'))
        }}
        className="finals"
      />
    </div>
  );
}
