import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { User } from '../models/UserModel.js'
import { Pet } from '../models/PetModel.js'
import { Adoption } from '../models/AdoptionModel.js'
import app from '../app.js'

let mongoServer
let userId
let petId
let adoptionId

test('Setup DB y modelos', async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  const user = await User.create({
    first_name: 'Juan',
    last_name: 'Pérez',
    email: 'juan@example.com',
    password: '123456',
    role: 'user'
  })

  const pet = await Pet.create({
    name: 'Firulais',
    type: 'dog',
    breed: 'Labrador',
    age: 3
  })

  userId = user._id.toString()
  petId = pet._id.toString()
})

test('POST /api/adoptions → crear adopción', async () => {
  const res = await request(app)
    .post('/api/adoptions')
    .send({ user: userId, pet: petId })

  assert.equal(res.status, 201)
  assert.ok(res.body._id)
  adoptionId = res.body._id
})

test('GET /api/adoptions → obtener todas', async () => {
  const res = await request(app).get('/api/adoptions')
  assert.equal(res.status, 200)
  assert.ok(Array.isArray(res.body))
})

test('GET /api/adoptions/:id → obtener por ID', async () => {
  const res = await request(app).get(`/api/adoptions/${adoptionId}`)
  assert.equal(res.status, 200)
  assert.equal(res.body._id, adoptionId)
})

test('POST vacío → error 400', async () => {
  const res = await request(app).post('/api/adoptions').send({})
  assert.equal(res.status, 400)
})

test('DELETE /api/adoptions/:id → eliminar', async () => {
  const res = await request(app).delete(`/api/adoptions/${adoptionId}`)
  assert.equal(res.status, 200)
  assert.equal(res.body.message, 'Adopción eliminada')
})

test('Tear down DB', async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})
