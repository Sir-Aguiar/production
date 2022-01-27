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

  // ENTRAR
  if (request.method == 'POST' && service == 'LOGIN') {
    let resposta
    async function Conectar() {
      if (!client.isConnected) await client.connect()
      const db = client.db('Users')
      return {
        db, client
      }
    }
    const { username, userpassword, identificador } = request.body

    const { db } = await Conectar()
    const USERCOLLECTION = await db.collection(username)

    return new Promise((resolve, reject) => {
      if (identificador) {
        USERCOLLECTION.find({}).toArray(function (error, result) {
          if (result[0]["_id"] == identificador) {
            resposta = {
              userName: `${result[0]['nome']}`,
              userTeams: result[0]['times'],
              serviceStatus: 0
            }
            console.log(resposta)
            console.log('Token Válido')
          }
          else {
            resposta = {
              serviceStatus: -1
            }
            console.log(resposta)
            console.log('Token inválido')
          }
          response.statusCode = 200
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(resposta, censor(resposta)));
          resolve();
        })
      }
      else {
        USERCOLLECTION.find({}).toArray(function (error, result) {
          if (result && result.length > 0) {
            if (userpassword === result[0]['senha']) {
              if (username === result[0]['nome']) {
                resposta = {
                  userId: `${result[0]['_id']}`,
                  userName: `${result[0]['nome']}`,
                  userTeams: result[0]['times'],
                  serviceStatus: 0
                }
                console.log(resposta)
                console.log(`Usuário logado com sucesso`)
              }
              else {
                resposta = {
                  serviceStatus: 404
                }
                console.log(resposta)
                console.log('Usuário não encontrado')
              }
            }
            else {
              resposta = {
                serviceStatus: -1
              }
              console.log(resposta)
              console.log('Senha errada')
            }
          }
          else {
            resposta = {
              serviceStatus: 404
            }
            console.log(resposta)
            console.log('Usuário não econtrado')
          }
          response.statusCode = 200
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'max-age=180000');
          response.end(JSON.stringify(resposta, censor(resposta)));
          resolve();
        })
      }
    })


  }

}


