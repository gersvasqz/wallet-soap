const DB = require('./database');
const Client = require('./models/client');

const register = (json, resp) => {
  return DB.connection.then(async () =>{
      const client = new Client(json);
      const error = await client.validateSync()
      console.log(error)
      return resp
  }).catch(err => {
    console.error(`${new Date().toISOString()} error in register : `, err)
  })
}

const recharge = (json, resp) => {
  return DB.connection.then(() =>{

  }).catch(err => {
    console.error(`${new Date().toISOString()} error in recharge : `, err)
  })
}

const payment = (json, resp) => {
  return DB.connection.then(() =>{

  }).catch(err => {
    console.error(`${new Date().toISOString()} error in payment : `, err)
  })
}

const confirm = (json, resp) => {
  return DB.connection.then(() =>{

  }).catch(err => {
    console.error(`${new Date().toISOString()} error in confirm : `, err)
  })
}

const balance = (json, resp) => {
  return DB.connection.then(() =>{

  }).catch(err => {
    console.error(`${new Date().toISOString()} error in balance : `, err)
  })
}

module.export = { register, recharge, payment, confirm, balance }