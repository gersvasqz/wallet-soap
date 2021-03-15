const Client = require('./models/client');
const Wallet = require('./models/wallet');


const formatErrors = (items) => {
  const errors = []
  if (items) {
    for (item in items) {
      if (item) errors.push(items[item].toString())
    }
  }
  return errors
}

const parseJSON = (json) => {
  return {
    dni: json.dni ? json.dni.trim() : undefined,
    name: json.name ? json.name.trim() : undefined,
    phone: json.phone ? Number.parseInt(json.phone, 10) : undefined,
    email: json.email ? json.email.trim() : undefined,
    token: json.token ? json.token.trim() : undefined,
    value: json.value ? Number.parseFloat(json.value) : undefined,
  }

}

const RegisterClient = async (json) => {
  const data = parseJSON(json)
  try {
    const client = new Client(data);
    let error = client.validateSync()
    const errors = formatErrors(error.errors)
    if (error) return {
      error: true,
      errors,
      msg: 'Invalid Params!'
    }

    await client.save();
    return {
      error: false,
      msg: 'client created successfully'
    }
  } catch (err) {
    console.error(`${new Date().toISOString()} -- Register error -- \n${err.toString()}\n______________\n`)
    return {
      error: true,
      errors: formatErrors(err.errors),
      msg: 'Internal error'
    }
  }
}

const RechargeWallet = async (json) => {
  try {
    const { dni, phone, value } = parseJSON(json)
    if (!value) return {
      error: true,
      msg: "Value is required",
      errors: []
    }
    const client = await Client.findOne({ dni, phone })
    if (!client) return {
      error: true,
      msg: "Client does not exist",
      errors: []
    }
    const wallet = await Wallet.findOne({ client: client._id })
    wallet.value += value
    await wallet.save()
    return {
      error: false,
      msg: 'Wallet is recharge',
      errors: []
    }
  } catch (err) {
    console.error(`${new Date().toISOString()} -- Recharge error -- \n${err.toString()}\n______________\n`)
    return {
      error: true,
      errors: formatErrors(err.errors),
      msg: 'Internal error'
    }
  }

}

const PayWithWallet = (json, resp) => {
  console.log('estoy en Payment', json)
  return json
  // return DB.connection.then(() => {

  // }).catch(err => {
  //   console.error(`${new Date().toISOString()} error in payment : `, err)
  // })
}

const ConfirmToken = (json, resp) => {
  console.log('estoy en ConfirmToken', json)
  return json
  // return DB.connection.then(() => {

  // }).catch(err => {
  //   console.error(`${new Date().toISOString()} error in confirm : `, err)
  // })
}

const GetBalance = async (json) => {
try {
  const { dni, phone } = parseJSON(json)
  const client = await Client.findOne({ dni, phone })
    if (!client) return {
      error: true,
      msg: "Client does not exist",
      errors: []
    }
    const wallet = await Wallet.findOne({ client: client._id })
    return {
      error: false,
      errors: [],
      msg: `Balance of ${client.name} is ${wallet.value}`,
      data: {
        name: client.name,
        value: wallet.value
      }
    }

}catch (err) {
    console.error(`${new Date().toISOString()} -- Balance error -- \n${err.toString()}\n______________\n`)
    return {
      error: true,
      errors: formatErrors(err.errors),
      msg: 'Internal error'
    }
  }
}


module.exports = { RegisterClient, RechargeWallet, PayWithWallet, ConfirmToken, GetBalance }