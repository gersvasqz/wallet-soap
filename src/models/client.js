const { Schema, model } = require('mongoose');
const Wallet = require('./wallet');

const ClientSchema = new Schema({
  name: { type: String, require: [true, 'name is required'] },
  email: {
    type: String,
    require: [true, '{PATH} is required'],
    validate: {
      validator: function(v) {
        return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  phone: {
    type: Number,
    require: [true, '{PATH} is required'],
    unique: [true, '{VALUE} ya registrado']
  },
  dni: {
    type: String,
    require: [true, '{PATH} is required'],
    unique: [true, '{VALUE} ya registrado']
  },
})

ClientSchema.pre('save', async function() {
  if(this.isNew) {
    const wallet = new Wallet({client: this._doc._id})
    await wallet.save().then(item => console.log('item', item)).catch(err => console.log(err))
  } 
});

module.exports = model('clients', ClientSchema)