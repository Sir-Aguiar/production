import { MongoClient } from "mongodb"
import axios from 'axios'
const client = new MongoClient('mongodb+srv://SirAguiar:06062005@cluster0.jh66v.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

async function Conectar() {
  if (!client.isConnected) await client.connect()
  const db = client.db('plantoes')
  return {
    db, client
  }
}

export default async function Timing(request, response) {

  response.setHeader('Access-Control-Allow-Credentials', true)
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  const { db } = await Conectar()
  const users = await db.collection('users')
  const plant_register = await db.collection('plantao_registro')
  const { service } = request.body



  // LOGIN
  const { username, userpass } = request.body
  if (request.method == "POST" && service == "LOGIN") {
    users.find({ "user": username, "senha": userpass }).toArray(function (err, result) {
      if (err) {
        response.status(400).json({
          "WORKED": false
        })
      };
      if (result.length > 0) {
        if (result[0].user == username && result[0].senha == userpass) {
          let qs = `?start=1&limit=2950&convert=BRL`
          axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' + qs, {
            headers: { 'X-CMC_PRO_API_KEY': 'f04378c1-59a3-4376-8bb4-af1a9bbc4f7a' }
          }).then(res => {
            res.data.data.forEach((cripto) => {
              if (cripto["name"] == "Bombcrypto") {
                response.json({ message: 'Válido', bomb: cripto["quote"]["BRL"]["price"] })
              }
            });
          })

        }
      }
      else {

        response.json({ message: "Inválido" })
      }
      return
    });
  }

  // REGISTER
  const { nome, c1_i, c1_f, c2_i, c2_f, c3_i, c3_f, c4_i, c4_f, tota, farm, media, identifier, tota_i } = request.body
  if (request.method == "POST" && service == 'REGISTER') {

    plant_register.insertOne({
      "_id": identifier,
      'Nome': nome,
      'Conta 1 (Inicial)': c1_i,
      'Conta 1 (Final)': c1_f,
      'Conta 2 (Inicial)': c2_i,
      'Conta 2 (Final)': c2_f,
      'Conta 3 (Inicial)': c3_i,
      'Conta 3 (Final)': c3_f,
      'Conta 4 (Inicial)': c4_i,
      'Conta 4 (Final)': c4_f,
      'Saldo inicial': tota_i,
      'Saldo': tota,
      'Farm total': farm,
      "BCOIN/hora": media
    })
      .then(
        () => {
          response.json({ message: 'Inserido com sucesso' })

        }
      )
      .catch(
        (err) => response.json({ message: "Houve um erro" })
      )
  }

  // PESQUISAR
  if (request.method == 'POST' && service == 'PESQUISAR') {
    plant_register.find({ 'Nome': nome }).toArray(function (err, result) {
      if (err) {
        response.status(400).json({
          "WORKED": false
        })
      };
      response.json(result)
      return
    });
  }

  // ATUALIZAR
  if (request.method == "POST" && service == 'UPDATE') {
    const update_object = { '_id': identifier }
    plant_register.updateOne(update_object, {
      $set: {
        "Nome": "Rafael Aguiar"
      }
    }, function (err, res) {
      if (err) throw err;
      console.log("1 document updated")
      response.json('Atualizado')
    })
  }
  // COIN
  if (request.method == 'POST' && service == "CRIPTO") {
    let qs = `?start=1&limit=2950&convert=BRL`
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' + qs, {
      headers: { 'X-CMC_PRO_API_KEY': 'f04378c1-59a3-4376-8bb4-af1a9bbc4f7a' }
    }).then(res => {
      response.json(res.data)
    })
  }
}