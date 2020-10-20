const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  }
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', phoneSchema)