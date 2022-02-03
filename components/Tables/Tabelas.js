import styles from './Tables.module.css'
import ServicesAPI from '../../scripts/ServicesAPI'
import { useEffect, useState } from 'react'
export default function Tabelas() {
  useEffect(() => {
    getUserteams();
  }, []);
  const [teams, setTeams] = useState([]);
  const [actualTeam, setTeam] = useState('');
  const [accountData, setAccountData] = useState([])
  const [Total, setTotal] = useState(0)
  const getUserteams = function () {
    ServicesAPI.post("", {
      service: "GETEAMS",
      userName: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.status == 200) {
        let usert = [];
        response.data.userTeams.forEach((time) => {
          usert.push(time.teamName);
        });
        setTeams(usert);
      }
    });
  };
  const Query = (teamName) => {
    ServicesAPI.post('', {
      service: 'QUERY',
      userName: localStorage.getItem('username'),
      teamName: teamName
    }).then(response => {
      console.log(response.status)
      console.log(response.data)
      setAccountData(response.data['Accounts'])
    })
  }
  return (
    <>
      <div className={styles.tabelas_container}>
        <div className={styles.team_picker}>
          <h1>Balanço individual de</h1>
          <select
            onChange={(e) => {
              Query(e.target.value);
              setTeam(e.target.value);
            }}
          >
            <option value="vazio">Escolha seu time</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.accounts}>
          {
            accountData && accountData.length > 0 && accountData.map((conta, index) => (
              <div className={styles.account_container} key={index * (Math.random()) * 0.3 / (Math.random())}>
                <h1>Conta {index + 1}</h1>
                <div className={styles.tables}>
                  <table>
                    <thead>
                      <tr>
                        <th>Autor</th>
                        <th>Início</th>
                        <th>Final</th>
                        <th>Lucro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        conta.map((dado, index) => (
                          <tr key={index * (Math.random()) * 0.295 / (Math.random())}>
                            <td>
                              {dado['Nome']}
                            </td>
                            <td>
                              {dado['Start']}
                            </td>
                            <td>
                              {dado['End']}
                            </td>
                            <td>
                              {dado['Lucro']}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </>
  )
}