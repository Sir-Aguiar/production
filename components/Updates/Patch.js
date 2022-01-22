import styles from './styles/Patch.module.css'

export default function Patch() {
  return (
    <div className={styles.update_container}>
      <h1>20/01/2022</h1>
      <p>
        Foram feitas algumas mudanças na página de registro, onde agora está disponível também o preço em tempo real do Bcoin. O layout ainda está mal otimizado, mas é algo que mudará muito em breve. </p>
      <p>Como há uma limitação no sistema da CoinMarketCap e,  para evitar problemas futuros, a cotação exibida em sua tela é a cotação no momento em que foi realizado o seu login.</p>
      <p>Na versão móvel houve a remoção de alguns elementos visuais não disponíveis ainda, então nada que mude na prática, apenas uma melhoria na interface de usuário</p>
      <p>Foram abstraídos os títulos no final do container de registro, para saber a que cada número se refere passe o mouse por cima e terá uma dica flutuante</p>
      <h1>22/01/2022</h1>
      <h2>Acessibilidade e Interface</h2>
      <p>Além da barra de navegação (ainda não definitiva) foi adaptado para aparelhos móveis a tabela de seu atual registro, futuramente haverá uma aba dedicada para pesquisa e consulta no banco de dados.</p>
      <p>Agora há um melhor acesso a plataforma por dispositivos móveis, de forma que possa ser feito um registro sem necessidade de uma tela maior</p>
    </div>
  )
}