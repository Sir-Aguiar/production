import { MongoClient } from "mongodb"
const client = new MongoClient('mongodb+srv://SirAguiar:06062005@cluster0.jh66v.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })

async function Conectar() {
  if (!client.isConnected) await client.connect()
  const db = client.db('plantoes')
  return {
    db, client
  }
}

export default async function Registro(request, response) {

  response.setHeader('Access-Control-Allow-Credentials', true)
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  const newTime = new Date().toGMTString()
  const { db } = await Conectar()
  const col = await db.collection('plantao_registro')
  const { nome } = request.body
  if (request.method == "POST") {
    col.find({'Nome' : nome}).toArray(function (err, result) {
      if (err) {
        response.status(400).json({
          "WORKED": false
        })
      };
      response.json(result)
      return
    });
  }
}