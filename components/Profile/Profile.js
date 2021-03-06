import styles from './styles/Profile.module.css'
import ServicesApi from '../../scripts/ServicesAPI'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
export default function Profile() {
  const [teams, setTeams] = useState([])
  const [actualType, setactualType] = useState()
  const [actualTeam, updateTeam] = useState()
  const checkType = (timeType) => {
    teams.forEach(time => {
      if (time.teamName == timeType) {
        setactualType(time.memberType)
      }
    });
  }
  const sendRequest = () => {
    const team = document.querySelector('#teampicker')
    const TeamName = String(team.value).trim()
    const contas = document.querySelector('#contas')
    const ncontas = Number(contas.value)
    if (TeamName != '' && ncontas > 0 && ncontas != '' && ncontas != ' ') {
      ServicesApi.post('', {
        service: 'CREATENEWTEAM',
        newTeamName: TeamName,
        userName: localStorage.getItem('username'),
        accountNumber: ncontas
      }).then(response => {
        if (response.status == 200) {
          getUserteams()
          toast.success('Time criado com sucesso')
        } else {
          toast.error('Este time já existe, tente outro nome')
        }
      })
    }
    else {
      toast.warn('Insira um nome ou número de contas')
    }
  }
  const getUserteams = function () {
    ServicesApi.post("", {
      service: "GETEAMS",
      userName: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.status == 200) {
        setTeams(response.data.userTeams)
      }
    });
  };
  const exitTeam = function () {
    if (actualTeam) {

      ServicesApi.post('', {
        service: 'EXITTEAM',
        teamName: actualTeam,
        userName: localStorage.getItem('username'),
        userId: localStorage.getItem('userId')
      }).then(response => {
        if (response.status == 200) {
          getUserteams()
          updateTeam('')
        } else {
          toast.error('Erro ao sair do time')
        }
      })
      return
    }
  }
  const delTeam = function () {
    if (actualTeam) {
      ServicesApi.post('', {
        service: 'DELTEAM',
        teamName: actualTeam,
        userName: localStorage.getItem('username'),
        userId: localStorage.getItem('userId')
      }).then(response => {
        if (response.status == 200) {
          exitTeam()
          getUserteams()
          updateTeam('')
          toast.success('Time deletado com sucesso')
        }
        
      })
      return
    }
  }
  const newMember = function () {
    ServicesApi.post('', {
      service: 'ADDMEMBER',
      Team: actualTeam,
      newMember: (document.querySelector('.newmember').value).trim(),
      userName: localStorage.getItem('username'),
      userId: localStorage.getItem('userId'),
      newMemberType: 'user'
    }).then(response => {
      
      if (response.status == 200) {
        toast.success('Usuário adicionado com sucesso')
      } else {
        toast.warn('Houve um erro')
      }
    }).catch(err => console.log(err))
  }
  const addAccount = () => {
    ServicesApi.post('', {
      service: 'ADDACCOUNT',
      userName: localStorage.getItem('username'),
      userTeam: actualTeam
    }).then(response => {
      if (response.status == 200) {
        toast.success('Conta adicionada com sucesso')
      }
      else {
        toast.error('Erro ao adicionar conta')
      }
    })
  }
  useEffect(() => {
    getUserteams()
    
  }, [])
  return (
    <div className={styles.profile_container}>
      <div className={styles.create_team}>
        <input type='text' placeholder='Nome do time' id='teampicker' />
        <input type='number' placeholder='N de contas' id='contas' />
        <button onClick={() => {
          sendRequest()
          setTimeout(() => {
            getUserteams()
          }, 400);
        }} title='Insira um nome e o número de contas para seu time, fazer parte ou criar um time é o primeiro passo'>Criar time</button>
      </div>
      <div className={styles.delete_and_exit_team}>
        <button onClick={getUserteams}>Atualizar lista</button>
        <select size={teams.length + 1} onChange={(e) => { updateTeam(e.target.value); checkType(e.target.value) }} title='Escolha um time a qual tem acesso'>
          <option value='vazio'>Escolha um time</option>
          {
            teams && teams.map(time => (
              <option key={`${time.teamName}${Math.random() * 999}`} value={time.teamName}>
                {time.teamName}
              </option>
            ))
          }
        </select>
        {
          actualTeam && actualTeam != 'vazio' && <>
            <button onClick={exitTeam}>Sair do time</button>
            {
              actualType == 'admin' ? (
                <>
                  <button onClick={delTeam}>Excluir</button>
                  <button onClick={addAccount}>Adicionar Conta</button>
                </>
              ) : <></>
            }
          </>
        }
      </div>
      {
        actualTeam && actualTeam != 'vazio' && actualType == 'admin' && (
          <div className={styles.add_member}>
            <input type='text' placeholder='Convidar (nome de usuário)' className='newmember' />
            <button onClick={newMember}>Adicionar a {actualTeam}</button>

          </div>
        )
      }
      <ToastContainer autoClose={4000} />
    </div>
  )
}
