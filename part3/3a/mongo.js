const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  ``

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', phoneSchema)

if (process.argv.length == 3) {
  Contact.find({}).then(result => {
    if (result.length > 0)
      result.forEach(c => {
        console.log(`${c.name} ${c.number}`)
      })
    else
      console.log('not found')
    mongoose.connection.close()
  })
}

if (process.argv.length > 3) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })

  contact.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}
