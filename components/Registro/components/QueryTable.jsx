export default function TableQuery(props) {
  return (
    <>
      {props.dados ? (
        props.dados.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Conta 1</th>
                <th>Conta 2</th>
                <th>Conta 3</th>
                <th>Conta 4</th>
                <th>Saldo do turno</th>
                <th>Média/hora</th>
                <th>Saldo inicial</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {props.dados.map((regi) => (
                <tr key={regi["_id"]}>
                  <td>{regi["_id"]}</td>
                  <td>{regi["Nome"]}</td>
                  <td>
                    {regi["Conta 1 (Inicial)"]} &rarr; {regi["Conta 1 (Final)"]}
                  </td>
                  <td>
                    {regi["Conta 2 (Inicial)"]} &rarr; {regi["Conta 2 (Final)"]}
                  </td>
                  <td>
                    {regi["Conta 3 (Inicial)"]} &rarr; {regi["Conta 3 (Final)"]}
                  </td>
                  <td>
                    {regi["Conta 4 (Inicial)"]} &rarr; {regi["Conta 4 (Final)"]}
                  </td>
                  <td>{regi["Farm total"]}</td>
                  <td>{regi["BCOIN/hora"]}</td>
                  <td>{regi["Saldo inicial"]}</td>
                  <td>{regi["Saldo"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
}
