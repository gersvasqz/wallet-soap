const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const WalletSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'clients' },
  address: { type: String, set: () => uuidv4() },
  value: { type: Number, default: 0 },
  history: [{
    historyid: String,
    date: { type: Date, set: () => new Date()},
    value: Number,
    operation: { type: String, enum: ['pay', 'recharge'] }
  }]
})

module.exports = model('wallets', WalletSchema)