const DB = require('./database');
const Client = require('./models/client');
const Wallet = require('./models/wallet');

const register = async (json) => {
  const resp = await DB.connection.then(async () => {
    const client = new Client(json);
    const resp = await client.save().then(() => {
      return {
        error: false,
        msg: 'client create succesfull'
      }
    }).catch(err => {
      return {
        error: true,
        errors: err.errors
      }
    })

    return resp
  }).catch(err => {
    console.error(`${new Date().toISOString()} error in register : `, err)
    return {
      error: true,
      errors: err.toString()
    }
  })
  return resp
}

const recharge = ({dni, phone, value}) => {
  return DB.connection.then(async () => {
    const client = await Client.findOne({ dni, phone: Number.parseInt(phone, 10)})
    if(!client) return {
      error: true,
      msg: 'Invalid client'
    }
    const wallet = await Wallet.findOne({client: client._id })
    wallet.value += Number.parseFloat(value)
    await wallet.save()
    return {
      error: false,
      msg: 'Wallet is recharge'

    }
  }).catch(err => {
    console.error(`${new Date().toISOString()} error in recharge : `, err)
  })
}

const payment = (json, resp) => {
  return DB.connection.then(() => {

  }).catch(err => {
    console.error(`${new Date().toISOString()} error in payment : `, err)
  })
}

const confirm = (json, resp) => {
  return DB.connection.then(() => {

  }).catch(err => {
    console.error(`${new Date().toISOString()} error in confirm : `, err)
  })
}

const balance = (json, resp) => {
  return DB.connection.then(() => {

  }).catch(err => {
    console.error(`${new Date().toISOString()} error in balance : `, err)
  })
}


module.exports = function (operation, data) {
  switch (operation) {
    case 'register':
      response = register(data)
      break;
    case 'recharge':
      response = recharge(data)
      break;
    case 'payment':
      response = payment(data)
      break;
    case 'confirm':
      response = confirm(data)
      break;
    case 'balance':
      response = balance(data)
      break;
    default:
      response = {
        error: true,
        message: 'invalid operation'
      }
  }
  return response;
}