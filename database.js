require('dotenv').config();

const {MongoClient} =require('mongodb');
const client =new MongoClient(process.env.CONFIG_MONGOOSE);

async function connection()
{
    let connect = await client.connect();
    let db = connect.db('portfolio');
    return db.collection('users');
}

module.exports =connection;