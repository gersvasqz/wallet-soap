const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Wallet = require('./wallet');

const ClientSchema = new Schema({
  name: { type: String, required: [true, '{PATH} is required'] },
  email: {
    type: String,
    required: [true, '{PATH} is required'],
    validate: {
      validator: function(v) {
        return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  phone: {
    type: Number,
    required: [true, '{PATH} is required'],
    unique: true
  },
  dni: {
    type: String,
    required: [true, '{PATH} is required'],
    unique: true
  },
})

ClientSchema.plugin(uniqueValidator, { message: '{PATH} already exist' });
ClientSchema.pre('save', async function() {
  if(this.isNew) {
    const wallet = new Wallet({client: this._doc._id})
    await wallet.save()
  } 
});

module.exports = model('clients', ClientSchema)