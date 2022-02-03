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
  const [totalData, setTotalData] = useState([])
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
      setTotalData(response.data['Geral'])
      setAccountData(response.data['Accounts'])
      let total = 0
      response.data['Geral'].forEach(registro => {
        total += Number(registro['Lucro'])
      })
      setTotal(total)
      console.log(Total)
    })
  }
  return (
    <>
      <div className={styles.tabelas_container}>
        <div className={styles.team_picker}>
          <h1>Balanço individual de</h1>
          <select
            onChange={(e) => {
              if (e.target.value != 'vazio') {
                setTeam(e.target.value);
                Query(e.target.value);
              }
              else {
                setTeam('')
              }
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
            actualTeam && accountData && accountData.length > 0 && accountData.map((conta, index) => (
              <div className={styles.account_container} key={index * (Math.random()) * 0.3 / (Math.random())}>
                <div className={styles.tableHeader}>
                  <h1>Conta {index + 1}</h1>
                </div>
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
                              {dado['Start'].toFixed(2)}
                            </td>
                            <td>
                              {dado['End'].toFixed(2)}
                            </td>
                            <td>
                              {dado['Lucro'].toFixed(2)}
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
      {
        actualTeam && totalData && totalData.length > 0 && <div className={styles.geralData}>
          <h1>Balanço Geral</h1>
          <div className={styles.geralTable}>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Autor</th>
                  <th>Início</th>
                  <th>Final</th>
                  <th>Lucro</th>
                </tr>
              </thead>
              <tbody>
                {
                  totalData && totalData.length > 0 && totalData.map((dado, index) => (
                    <tr key={index * (Math.random(0.32 * index / (index * 0.23 / index + 42)))}>
                      <td>{dado['Data']}</td>
                      <td>{dado['Nome']}</td>
                      <td>{dado['Start'].toFixed(2)}</td>
                      <td>{dado['End'].toFixed(2)}</td>
                      <td>{dado['Lucro'].toFixed(2)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <p>Saldo: {Total.toFixed(2)}</p>
        </div>
      }
    </>
  )
}