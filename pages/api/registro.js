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
  const { nome, c1_i, c1_f, c2_i, c2_f, c3_i, c3_f, c4_i, c4_f, tota, farm, media, identifier, tota_i } = request.body
  if (request.method == "POST") {
    col.insertOne({
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
      'Saldo inicial' : tota_i,
      'Saldo': tota,
      'Farm total': farm,
      "BCOIN/hora": media
    })
      .then(
        () => response.json({ message: 'Inserido com sucesso' })
      )
      .catch(
        (err) => response.json({ message: "Houve um erro" })
      )
  }
}