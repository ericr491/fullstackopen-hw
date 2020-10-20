const phonesRouter = require('express').Router()
const Phone = require('../models/phone')

phonesRouter.get('/info', (req, res) => {
  Phone.find({})
    .then(result => result.length)
    .then(length => res.send('<div>Phonebook has info for ' + length + ' people</div> <div> ' + new Date() + '</div>'))
})

phonesRouter.get('/', (req, res) => {
  Phone.find({}).then(c => {
    res.json(c)
  })
})


phonesRouter.get('/:id', (req, res, next) => {
  Phone.findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person)
      else
        res.status(404).end()
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({
        error: 'malformed id'
      })
    })
})

phonesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Phone.findByIdAndDelete(id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

phonesRouter.post('/', (req, res, next) => {
  const body = req.body


  const person = new Phone({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => {
      res.status(400).json({
        error: error.message
      })
    })
})

phonesRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const phone = {
    name: body.name,
    number: body.number,
  }

  Phone.findByIdAndUpdate(req.params.id, phone, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(e => next(e))
})

module.exports = phonesRouter