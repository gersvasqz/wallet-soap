const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const WalletSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'clients' },
  address: String,
  value: { type: Number, default: 0 },
  history: [{
    historyid: String,
    date: Date,
    value: Number,
    operation: { type: String, enum: ['pay', 'recharge'] }
  }]
})

WalletSchema.pre('save',  function() {
  if(this.isNew) this._doc.address = uuidv4()
});

module.exports = model('wallets', WalletSchema)