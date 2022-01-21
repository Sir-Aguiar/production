import styles from "./Contas.module.css";
export default function Contas({ index, setconta_f, setconta_i, initialvalue }) {
  return (
    <div className={`${styles.account_field}`}>
      <h2>Conta {index}</h2>
      <input
        type="text"
        placeholder="Saldo inicial"
        onChange={(e) => {
          setconta_i(e.target.value.replace(",", "."));
        }}
        className="incials"
        
      />
      <input
        type="text"
        placeholder="Saldo final"
        onChange={(e) => {
          setconta_f(e.target.value.replace(",", "."));
        }}
        className="finals"
      />
    </div>
  );
}
