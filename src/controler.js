import Client from './models/client';
import Wallet from './models/wallet';


const formatErrors = (items) => {
  const errors = []
  if (items) {
    const keys = Object.keys(items)
    keys.forEach(i => {
      errors.push(items[i].toString())
    })
  }
  return errors
}

const parseJSON = (json) => ({
    dni: json.dni ? json.dni.trim() : undefined,
    name: json.name ? json.name.trim() : undefined,
    phone: json.phone ? Number.parseInt(json.phone, 10) : undefined,
    email: json.email ? json.email.trim() : undefined,
    token: json.token ? json.token.trim() : undefined,
    value: json.value ? Number.parseFloat(json.value) : undefined,
  })

const RegisterClient = async (json) => {
  const data = parseJSON(json)
  try {
    const client = new Client(data);
    const error = client.validateSync()
    if (error) return {
      error: true,
      errors: formatErrors(error.errors),
      msg: 'Invalid Params!'
    }

    const resp = await client.save().catch(e =>({
        error: true,
        errors: formatErrors(e.errors),
        msg: 'Invalid Params'
      }));
    if(resp.error) return resp
    return {
      error: false,
      errors: [],
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
      errors: [],
      msg: "Value is required"
    }
    const client = await Client.findOne({ dni, phone })
    if (!client) return {
      error: true,
      errors: [],
      msg: "Client does not exist"
    }
    const wallet = await Wallet.findOne({ client: client._id })
    wallet.value += value
    await wallet.save()
    return {
      error: false,
      errors: [],
      msg: 'Wallet is recharged'
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

const PayWithWallet = (json) => {
  console.log('estoy en Payment', json)
  return json
  // return DB.connection.then(() => {

  // }).catch(err => {
  //   console.error(`${new Date().toISOString()} error in payment : `, err)
  // })
}

const ConfirmToken = (json) => {
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
      errors: [],
      msg: "Client does not exist"
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

  } catch (err) {
    console.error(`${new Date().toISOString()} -- Balance error -- \n${err.toString()}\n______________\n`)
    return {
      error: true,
      errors: formatErrors(err.errors),
      msg: 'Internal error'
    }
  }
}


export default { RegisterClient, RechargeWallet, PayWithWallet, ConfirmToken, GetBalance }