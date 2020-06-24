const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const phoneSchema = new Schema({
  
  contact: { type: Schema.Types.ObjectId, ref: 'Contact' },
  phone_number: { type: String, required: true }

});

module.exports = mongoose.model('Phone', phoneSchema);
