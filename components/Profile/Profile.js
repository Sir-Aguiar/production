import styles from './styles/Profile.module.css'
import ServicesApi from '../../scripts/ServicesAPI'
export default function Profile() {
  const sendRequest = () => {
    const team = document.querySelector('#teampicker')
    const TeamName = String(team.value).trim()
    const contas = document.querySelector('#contas')
    const ncontas = Number(contas.value)
    if (TeamName != '') {
      ServicesApi.post('/services', {
        service: 'CREATENEWTEAM',
        newTeamName: TeamName,
        userName: localStorage.getItem('username'),
        accountNumber: ncontas
      }).then(response => {
        console.log(response.data)
      })
    }

    console.log(`Enviado time como : ${TeamName} : ${ncontas}`)
  }
  return (
    <div className={styles.profile_container}>
      <div className={styles.create_team}>
        <input type='text' placeholder='Nome do time' id='teampicker' />
        <input type='number' placeholder='N de contas' id='contas' />
        <button onClick={sendRequest}>Criar time</button>
      </div>
    </div>
  )
}