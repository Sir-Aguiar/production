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
    const { username, userpassword, identificador } = request.body
    return new Promise((resolve, reject) => {
      USERCOLLECTION.find({ 'Username': username }).toArray(function (error, result) {
        // Usuário existir
        if (result && result.length == 1) {
          // Identificador Existir
          if (identificador) {
            // Identificador correto
            if (identificador == result[0]['_id']) {
              resposta = {
                Nome: `${result[0]['Nome']}`,
                userName: `${result[0]['Username']}`,
                userTeams: result[0]['Times'],
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
            resposta = {
              userId: `${result[0]['_id']}`,
              Nome: `${result[0]['Nome']}`,
              userName: `${result[0]['Username']}`,
              userTeams: result[0]['Times'],
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
    const { userName, fullName, userPassword, userTeams } = request.body
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
            Times: [{
              teamName: userTeams,
              userType: 'admin'
            }]
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
}


/**/