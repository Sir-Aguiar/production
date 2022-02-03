import { MongoClient, ObjectId } from "mongodb"
import axios from 'axios'

const client = new MongoClient(process.env.REACT_APP_NOT_SECRET_CODE, { useNewUrlParser: true, useUnifiedTopology: true })

function ValidateUser(result, userName) {
  let userValid
  if (result.length == 1) {
    result[0].Membros.forEach(membro => {
      if (membro.MemberName == userName) {
        userValid = true
      }
    })
    if (userValid) return true
    return false
  }
}
export default async function Timing(request, response) {
  function censor(censor) {
    var i = 0;

    return function (key, value) {
      if (i !== 0 && typeof (censor) === 'object' && typeof (value) == 'object' && censor == value)
        return '[Circular]';

      if (i >= 29) // seems to be a harded maximum of 30 serialized objects?
        return '[Unknown]';

      ++i; // so we know we aren't using the original object anymore

      return value;
    }
  }
  response.setHeader('Access-Control-Allow-Origin', '*')

  const { service } = request.body
  async function ConnectToUserDB() {
    if (!client.isConnected) await client.connect()
    const USERDB = client.db('Users')
    return {
      USERDB, client
    }
  }

  const { USERDB } = await ConnectToUserDB()
  const USERCOLLECTION = await USERDB.collection('Users')
  // ENTRAR
  if (request.method == 'POST' && service == 'LOGIN') {
    let resposta
    let Teams = []
    const { username, userpassword, identificador } = request.body
    return new Promise((resolve, reject) => {
      USERCOLLECTION.find({ 'Username': username }).toArray(function (error, result) {
        // Usuário existir
        if (result && result.length == 1) {
          // Identificador Existir
          if (identificador) {
            // Identificador correto
            if (identificador == result[0]['_id']) {
              if (result[0]['Times']) {
                result[0]['Times'].forEach(time => {
                  Teams.push(time.teamName)
                });
              }
              resposta = {
                Nome: `${result[0]['Nome']}`,
                userName: `${result[0]['Username']}`,
                userTeams: Teams,
                serviceStatus: 0
              }

            }
            // Identificador errado
            else {
              resposta = {
                serviceStatus: -1
              }
            }
          }
          // Caso não exista identificador
          // Nome e senha corretos
          else if (result[0]['Senha'] == userpassword) {
            if (result[0]['Times']) {
              result[0]['Times'].forEach(time => {
                Teams.push(time.teamName)
              });
            }
            resposta = {
              userId: `${result[0]['_id']}`,
              Nome: `${result[0]['Nome']}`,
              userName: `${result[0]['Username']}`,
              userTeams: Teams,
              serviceStatus: 0
            }
          }
          // Senha incorreta
          else {
            resposta = {
              serviceStatus: -1
            }
          }
        }
        // Usuário não existir
        else {
          resposta = {
            serviceStatus: 404
          }
        }
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'max-age=180000');
        response.end(JSON.stringify(resposta, censor(resposta)));
        resolve();
      })
    })
  }
  // CADASTRO
  if (request.method == 'POST' && service == 'CADASTRO') {
    let serviceResponse = { serviceStatus: 0 }
    const { userName, fullName, userPassword } = request.body
    return new Promise((resolve, reject) => {
      USERCOLLECTION.find({ 'Username': userName }).toArray(function (error, result) {
        if (result && result.length >= 1) {
          serviceResponse = {
            serviceStatus: -1
          }
          response.statusCode = 200
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
          resolve();
          return
        }
        if (serviceResponse.serviceStatus != -1) {
          USERCOLLECTION.insertOne({
            Nome: fullName,
            Username: userName,
            Senha: userPassword,
            Times: []
          }, function (err, result) {
            if (err) {
              serviceResponse = {
                serviceStatus: 1
              }
            }
            else {
              serviceResponse = {
                serviceStatus: 0
              }
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Cache-Control', 'max-age=180000');
            response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
            resolve();
          })
        }
      })
    });
  }
  // Pegar times
  if (request.method == 'POST' && service == 'GETEAMS') {
    const { userId, userName } = request.body

    return new Promise((resolve, reject) => {
      const filter = {
        'Username': userName,
        '_id': new ObjectId(userId)
      }
      USERCOLLECTION.find(filter).toArray((err, result) => {
        let serviceResponse = {
          userTeams: []
        }
        result[0]['Times'].forEach(time => {
          serviceResponse.userTeams.push({
            'teamName': time.teamName,
            'memberType': time.userType
          })
        });
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'max-age=180000');
        response.end(JSON.stringify(serviceResponse));
        resolve();
      })
    })
  }
  // CREATETEAM
  if (request.method == 'POST' && service == 'CREATENEWTEAM') {
    let serviceResponse = {
      serviceStatus: 0
    }
    const { newTeamName, userName, accountNumber } = request.body
    if (!client.isConnected) await client.connect()
    const TEAMSDB = client.db('Teams')
    const userFilter = {
      Username: userName
    }
    const action = {
      $push: {
        'Times': {
          teamName: newTeamName,
          userType: 'admin'
        }
      }
    }
    return new Promise((resolve, reject) => {

      TEAMSDB.collection('Times').find({ 'Nome': newTeamName }).toArray((err, result) => {
        if (result.length >= 1) {
          serviceResponse = {
            serviceStatus: -1
          }
          response.statusCode = 200
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
          resolve();
        }
        else {

          if (serviceResponse.serviceStatus == 0) {
            let DocumentToInsert = {
              'Nome': newTeamName,
              'Membros': [
                {
                  'MemberName': userName,
                  'memberType': 'admin'
                }
              ],
              'NumeroConta': 0,
              'Registros': [],
            }
            for (let index = 1; index <= accountNumber; index++) {
              DocumentToInsert[`Conta ${index}`] = []
              DocumentToInsert[`NumeroConta`] = index
            }

            TEAMSDB.collection('Times').insertOne(DocumentToInsert)
            USERCOLLECTION.updateOne(userFilter, action, function (err, result) {
              if (err) {
                serviceResponse = {
                  serviceStatus: 1
                }
                response.statusCode = 400
                response.setHeader('Content-Type', 'application/json');
                response.setHeader('Cache-Control', 'max-age=180000');
                response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
                resolve();
              }
              else {
                serviceResponse = {
                  serviceStatus: 0
                }
                response.statusCode = 200
                response.setHeader('Content-Type', 'application/json');
                response.setHeader('Cache-Control', 'max-age=180000');
                response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
                resolve();
              }
            })
          }
        }
      })

    })
  }
  // TEMINFOS
  if (request.method == 'POST' && service == 'TEAMINFOS') {
    const { teamName } = request.body
    if (!client.isConnected) await client.connect()
    const TEAMSDB = client.db('Teams')
    return new Promise((resolve, reject) => {
      TEAMSDB.collection('Times').find({ Nome: teamName }).toArray((err, result) => {
        let serviceResponse = {
          serviceStatus: 0,
          accountNumber: result[0]['NumeroConta']
        }
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'max-age=180000');
        response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
        resolve();
      })
    })
  }
  // Fazer registro em um time
  if (request.method == 'POST' && service == 'REGISTER') {
    if (!client.isConnected) await client.connect()
    const TEAMSDB = client.db('Teams')
    const TEAMSCOLLECTION = TEAMSDB.collection('Times')
    return new Promise((resolve, reject) => {
      const { teamName, userName, Contas } = request.body
      const filter = {
        'Nome': teamName
      }
      TEAMSCOLLECTION.find(filter).toArray(function (err, result) {
        if (ValidateUser(result, userName)) {
          let ContasToInsert
          ContasToInsert = Contas
          const filter = {
            'Nome': teamName
          }
          TEAMSCOLLECTION.updateOne(filter, {
            $push: ContasToInsert
          })
          let serviceResponse = {
            serviceStatus: 0,
            message: 'Registro inserido com sucesso'
          }
          response.statusCode = 200
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
          resolve();
        }
        else {
          let serviceResponse = {
            serviceStatus: -1,
            message: 'Ação não autorizada pelo servidor'
          }
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
          resolve();
        }
      })
    })
  }
  // EXIT TEAM
  if (request.method == 'POST' && service == 'EXITTEAM') {
    if (!client.isConnected) await client.connect()
    const TEAMSDB = client.db('Teams')
    const { teamName, userName, userId } = request.body
    return new Promise((resolve, reject) => {
      const filter = {
        'Username': userName,
        '_id': new ObjectId(userId)
      }
      const aboutRemove = {
        $pull: {
          'Times': {
            'teamName': teamName
          }
        }
      }
      USERCOLLECTION.updateOne(filter, aboutRemove, (err, result) => {

        let serviceResponse = {
          serviceStatus: 0
        }
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'max-age=180000');
        response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
        resolve();
      })
    })
  }
  // DELTEAM
  if (request.method == 'POST' && service == 'DELTEAM') {
    if (!client.isConnected) await client.connect()
    const TEAMSDB = client.db('Teams')
    const { teamName, userName, userId } = request.body
    return new Promise((resolve, reject) => {
      const filter = {
        'Nome': teamName,
      }
      const aboutRemove = {
        $unset: {
          'Nome': teamName
        }
      }
      TEAMSDB.collection('Times').updateOne(filter, aboutRemove, (err, result) => {
        let serviceResponse = {
          serviceStatus: 0
        }
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'max-age=180000');
        response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
        resolve();
      })
    })
  }
  // ADD MEMBER
  if (request.method == 'POST' && service == 'ADDMEMBER') {
    if (!client.isConnected) await client.connect()
    const TEAMSDB = client.db('Teams')
    const { Team, userName, userId, newMember, newMemberType } = request.body
    return new Promise((resolve, reject) => {
      // Verificar se o time existe
      const teamFilter = {
        'Nome': Team
      }
      TEAMSDB.collection('Times').find(teamFilter).toArray((err, result) => {
        // Time inválido
        if (result.length != 1) {
          let serviceResponse = {
            serviceStatus: 404,
            message: 'Time não existe ou não encontrado'
          }
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
          resolve();
        }
        else {
          let members = []
          result[0]['Membros'].forEach(membro => {
            members.push(membro.MemberName)
          });

          if (!members.includes(newMember)) {
            const updateFilter = { 'Nome': Team }
            const updateAction = { $push: { 'Membros': { 'MemberName': newMember, 'memberType': newMemberType } } }
            TEAMSDB.collection('Times').updateOne(updateFilter, updateAction, (err, result) => {
              if (err) {
                let serviceResponse = {
                  serviceStatus: -1,
                  message: 'Erro inesperado'
                }
                response.statusCode = 400
                response.setHeader('Content-Type', 'application/json');
                response.setHeader('Cache-Control', 'max-age=180000');
                response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
                resolve();
              } else {
                USERCOLLECTION.updateMany({ 'Username': newMember }, {
                  $push: {
                    'Times': {
                      'teamName': Team,
                      'userType': newMemberType
                    }
                  }
                }, function (err, result) {
                  if (err) {
                    let serviceResponse = {
                      serviceStatus: -1,
                      message: `Erro inesperado`
                    }
                    response.statusCode = 400
                    response.setHeader('Content-Type', 'application/json');
                    response.setHeader('Cache-Control', 'max-age=180000');
                    response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
                    resolve();
                  }
                  else {
                    let serviceResponse = {
                      serviceStatus: 0,
                      message: `${newMember} adicionado com sucesso`
                    }
                    response.statusCode = 200
                    response.setHeader('Content-Type', 'application/json');
                    response.setHeader('Cache-Control', 'max-age=180000');
                    response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
                    resolve();
                  }
                })
              }
            })
          }
        }
      })
    })
  }
  // QUERY
  if (request.method == 'POST' && service == 'QUERY') {

    if (!client.isConnected) await client.connect()
    const TEAMSDB = client.db('Teams')
    const TEAMSCOLLECTION = TEAMSDB.collection('Times')
    return new Promise((resolve, reject) => {
      const { teamName, userName } = request.body
      const filter = {
        'Nome': teamName
      }
      const Contas = []
      let Geral
      TEAMSCOLLECTION.find(filter).toArray(function (err, result) {
        if (ValidateUser(result, userName)) {
          Geral = result[0]['Registros']
          for (let index = 1; index <= result[0]['NumeroConta']; index++) {
            Contas.push(result[0][`Conta ${index}`])
          }
         
          let serviceResponse = {
            message: 'Busca realizada com sucesso',
            Accounts: Contas,
            'Geral': Geral
          }
          response.statusCode = 200
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(serviceResponse));
          resolve();
        }
        else {
          
          let serviceResponse = {
            message: 'Erro ao realizar busca'
          }
          response.statusCode = 400
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
          resolve();
        }
      })
    })
  }
}