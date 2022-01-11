import { MongoClient } from "mongodb"
const client = new MongoClient('mongodb+srv://SirAguiar:06062005@cluster0.jh66v.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

async function Conectar() {
  if (!client.isConnected) await client.connect()
  const db = client.db('other')
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

  const newTime = new Date().toGMTString()
  const { db } = await Conectar()
  const users = await db.collection('users')
  const { username, userpass } = request.body
  if (request.method == 'GET') {
    users.find({ "user": username }).toArray(function (err, result) {
      if (err) {
        response.status(400).json({
          "WORKED": false
        })
      };
      response.json({message : "You got pranked"})
      return
    });
  }
  if (request.method == "POST") {

    users.find({ "user": username, "senha": userpass }).toArray(function (err, result) {
      if (err) {
        response.status(400).json({
          "WORKED": false
        })
      };
      if (result.length > 0) {
        if (result[0].user == username && result[0].senha == userpass) {
          response.json({ message: 'Válido' })
        }
      }
      else {
        response.json({ message: "Inválido" })
      }
      return
    });
  }
}