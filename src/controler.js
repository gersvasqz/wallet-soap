import Client from './models/client';
import Wallet from './models/wallet';
import Invoices from "./models/invoices";
import Mailer from "./mailerconfig";

const sendMail = async(name, email, token) => {
  const transporter = Mailer();
  await transporter
  .sendMail({
    from: '"Wallet - AUTH"',
    to: email,
    subject: 'Authorization token',
    html: `<h3> Hello ${name}</3><br />
    Your authorization token is: ${token} <p>
    Please go to <a href="http://localhost:9000/api/confirm-token/${token}"> confirm token </a><p>
    Tranks!`,
  })
}

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
    session: json.session ? json.session.trim() : undefined,
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
    wallet.value += value;
    wallet.history.push({
      historyid: `TRANSACCION-${new Date().setHours(2)}-${Math.round(Math.random()* 9999999)}`,
      date: new Date(),
      value,
      operation: "recharge"
    });
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

const PayWithWallet = async (json) => {
  try {
    const { dni, phone, value, session } = parseJSON(json)
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
    if(wallet.value === 0) return {
      error: true,
      errors: [],
      msg: "Insufficient balance"
    }
    const token = `TOKEN-${new Date().setHours(2)}-${Math.round(Math.random()* 9999999)}`
    const invoice = new Invoices({
      wallet: wallet._id,
      token,
      session,
      value
    });
    await invoice.save()
    await sendMail(client.name, client.email, token)
    return {
      error: false,
      errors: [],
      msg: `Your Authorization Token has been sent to: ${client.email}`
    }
  } catch (err) {
    console.error(`${new Date().toISOString()} -- PayWithWallet error -- \n${err.toString()}\n______________\n`)
    return {
      error: true,
      errors: formatErrors(err.errors),
      msg: 'Internal error'
    }
  }
}

const ConfirmToken = async (json) => {
  try {
    const { token, session } = parseJSON(json)
    const invoice = await Invoices.findOne({ token, session })
    if(!invoice) return {
      error: true,
      errors: [],
      msg: 'Token Denied'
    }
  
    const wallet = await Wallet.findOne({ _id: invoice.wallet })
    wallet.value -= invoice.value;
    wallet.history.push({
      historyid: token.replace('TOKEN-', 'TRANSACCION-'),
      date: new Date(),
      value: invoice.value,
      operation: "pay"
    });
    await wallet.save()
    await invoice.delete()
    return {
      error: false,
      errors: [],
      msg: 'Confirmed Token, Payment Approved'
    }
    
  } catch (err) {
    console.error(`${new Date().toISOString()} -- ConfirmToken error -- \n${err.toString()}\n______________\n`)
    return {
      error: true,
      errors: formatErrors(err.errors),
      msg: 'Internal error'
    }
  }
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