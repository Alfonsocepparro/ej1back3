import { faker } from '@faker-js/faker'
import { ObjectId } from 'mongodb'

export function generateMockUsers(count = 100) {
  const users = []

  for (let i = 0; i < count; i++) {
    users.push({
      _id: new ObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: []
    })
  }

  return users
}
