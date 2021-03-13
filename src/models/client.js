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
    require: [true, '{PATH} is required']
  },
  dni: {
    type: Number,
    require: [true, '{PATH} is required']
  },
})

ClientSchema.post('save', function(doc) {
  if(doc.isNew){
    const wallet = new Wallet({client: doc._id})
    wallet.save()
  } 
});

module.exports = model('clients', ClientSchema)