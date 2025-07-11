import { Router } from 'express'
import { faker } from '@faker-js/faker'
import { ObjectId } from 'mongodb'

const router = Router()

router.get('/mockingusers', (req, res) => {
 

  const count = parseInt(req.query.count) || 100

  if (isNaN(count) || count <= 0) {
    return res.status(400).json({ error: 'El parámetro count debe ser un número positivo' })
  }

  try {
    const users = []

    for (let i = 0; i < count; i++) {
      users.push({
        _id: new ObjectId(), // ID falso manual
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
      })
    }

    res.json({ users })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al generar los usuarios mockeados' })
  }
})

export default router
