import { MongoClient } from "mongodb"
import axios from 'axios'

const client = new MongoClient('mongodb+srv://SirAguiar:06062005@cluster0.jh66v.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })


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
    const { userName, fullName, userPassword} = request.body
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
            Senha: userPassword
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
            console.log(DocumentToInsert)
            TEAMSDB.collection('Times').insertOne(DocumentToInsert)
            USERCOLLECTION.updateOne(userFilter, action, function (err, result) {
              if (err) {
                serviceResponse = {
                  serviceStatus: 1
                }
                response.statusCode = 200
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
    TEAMSDB.collection('Times').find({ Nome: teamName }).toArray((err, result) => {
      if (result.length == 1) {
        return new Promise((resolve, reject) => {
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
      }
    })
  }
  // Fazer registro em um time
  if (request.method == 'POST' && service == 'REGISTER') {
    let serviceResponse = {
      serviceStatus: 0
    }
    let userValid = true
    const {
      teamName,
      userName,
      accountNumber,
      DadosContas,
      DadosTotal
    } = request.body

    if (!client.isConnected) await client.connect()
    const TEAMSDB = client.db('Teams')
    let ObjectToInsert = {
      'Registros': DadosTotal
    }
    return new Promise((resolve, reject) => {

      TEAMSDB.collection('Times').find({ 'Nome': teamName }).toArray((err, result) => {
        if (result.length == 1) {
          result[0]['Membros'].forEach(membro => {
            if (membro['MemberName'] == userName) {
              userValid = true
            }
          });
        }
      })
      if (userValid) {
        for (let index = 0; index < DadosContas.length; index++) {
          ObjectToInsert[`Conta ${index + 1}`] = {
            'Nome': userName,
            'Start': DadosContas[index]['Start'],
            'End': DadosContas[index]['End'],
            'Lucro': DadosContas[index]['Lucro']
          }
        }
        const filter = {
          'Nome': teamName
        }
        const action = {
          $push: ObjectToInsert
        }
        TEAMSDB.collection('Times').updateOne(filter, action, (err, result) => {
          if (err) {
            serviceResponse.serviceStatus = -1
            response.statusCode = 400
            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Cache-Control', 'max-age=180000');
            response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
            resolve();
          }
          else {
            serviceResponse.serviceStatus = 0
            response.statusCode = 200
            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Cache-Control', 'max-age=180000');
            response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
            resolve();
          }
        }
        )
      }
      else {
        serviceResponse.serviceStatus = -1
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Cache-Control', 'max-age=180000');
        response.end(JSON.stringify(serviceResponse, censor(serviceResponse)));
        resolve();
      }
    })

  }
}