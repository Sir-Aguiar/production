import styles from './styles/Profile.module.css'
import ServicesApi from '../../scripts/ServicesAPI'
import { useEffect, useState } from 'react'
export default function Profile() {
  const [teams, setTeams] = useState([])
  const [actualTeam, updateTeam] = useState()
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
        if (response.data.serviceStatus == 0) {
          getUserteams()
        }
      })
    }
  }
  const getUserteams = function () {
    ServicesApi.post("/services", {
      service: "GETEAMS",
      userName: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.status == 200) {
        setTeams(response.data.userTeams);
      }
    });
  };
  const exitTeam = function () {
    if (teams.includes(actualTeam)) {

      ServicesApi.post('/services', {
        service: 'EXITTEAM',
        teamName: actualTeam,
        userName: localStorage.getItem('username'),
        userId: localStorage.getItem('userId')
      }).then(response => {
        if (response.status == 200) {
          getUserteams()
          updateTeam('')
        }
      })
      return
    }
  }
  const delTeam = function () {
    if (teams.includes(actualTeam)) {
      ServicesApi.post('/services', {
        service: 'DELTEAM',
        teamName: actualTeam,
        userName: localStorage.getItem('username'),
        userId: localStorage.getItem('userId')
      }).then(response => {
        if (response.status == 200) {
          exitTeam()
          getUserteams()
          updateTeam('')
        }
      })
      return
    }
  }
  const newMember = function () {
    ServicesApi.post('/services', {
      service: 'ADDMEMBER',
      Team: actualTeam,
      newMember: (document.querySelector('.newmember').value).trim(),
      userName: localStorage.getItem('username'),
      userId: localStorage.getItem('userId'),
      newMemberType: 'user'
    }).then(response => {
      console.log(response.data)
      console.log(response.status)
    }).catch(err => console.log(err))
  }
  useEffect(() => {
    getUserteams()
  }, [])
  return (
    <div className={styles.profile_container}>
      <div className={styles.create_team}>
        <input type='text' placeholder='Nome do time' id='teampicker' />
        <input type='number' placeholder='N de contas' id='contas' />
        <button onClick={sendRequest}>Criar time</button>
      </div>
      <div className={styles.delete_team}>
        {
          actualTeam && actualTeam != 'vazio' && <h1>{actualTeam}</h1>
        }
        <select size={teams.length + 1} onChange={(e) => updateTeam(e.target.value)} >
          <option value='vazio'>Escolha um time</option>
          {
            teams && teams.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))
          }
        </select>
        {
          actualTeam && teams.includes(actualTeam) && <>
            <button onClick={exitTeam}>Sair do time</button>
            <button onClick={delTeam}>Excluir</button>
          </>
        }
      </div>
      <div className={styles.add_member}>
        {
          actualTeam && (
            <>
              <input type='text' placeholder='Convidar (nome de usuário)' className='newmember' />
              <button onClick={newMember}>Adicionar a {actualTeam}</button>
            </>
          )
        }
      </div>
    </div>
  )
}