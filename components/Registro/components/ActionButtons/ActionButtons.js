import styles from './ActionButtons.module.css'
import axios from 'axios'
export default function ActionButtons({ setTotal, setTotalInicial, setFarm }) {
  const data = new Date();

  const Calcular = function () {
    let ContasIniciais = 0
    let ContasFinais = 0
    const CI = document.querySelectorAll('.inicials')
    const CF = document.querySelectorAll('.finals')
    CI.forEach(conta => {
      ContasIniciais += Number(conta.value)
    });
    CF.forEach(conta => {
      ContasFinais += Number(conta.value)
    });
    setTotal(ContasFinais.toFixed(2))
    setTotalInicial(ContasIniciais.toFixed(2))
    setFarm(ContasFinais - ContasIniciais)
  }

  const Registrar = () => {

  }

  return (
    <div className={styles.actions}>
      <div className={styles.important_buttons}>
        <button
          onClick={Calcular}
          title="Aperte para processar os dados inseridos "
        >
          Calcular
        </button>
        <button
          onClick={Registrar}
          title="Insira seu registro no banco de dados"
        >
          Registrar
        </button>
      </div>

      <input
        type="text"
        placeholder="Pesquisar registros de"
        className={`${styles.nametosearch} nametosearch`}
      />

    </div>
  )
}