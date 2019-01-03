'use strict'

const Suite = use('Test/Suite')('Auth')
const { test, trait } = Suite
const User = use('App/Models/User')

trait('Test/ApiClient')

const { beforeEach } = Suite

beforeEach(async () => {
  const user = await User.findBy('email', 'renan.mav@hotmail.com')
  if (user) {
    user.delete()
  }
})

test('it should create a user succefully', async ({ client }) => {
  const user = {
    name: 'Renan Machado',
    email: 'renan.mav@hotmail.com',
    password: 'renanmav.97',
    password_confirmation: 'renanmav.97'
  }

  const response = await client
    .post('/users')
    .send(user)
    .end()

  response.assertStatus(200)
})

test('it should be able to authenticate with valid credentials', async ({
  client,
  assert
}) => {
  const user = await User.create({
    name: 'Renan',
    email: 'renan.mav@hotmail.com',
    password: 'renanmav.97'
  })

  const response = await client
    .post('/sessions')
    .send({ email: user.email, password: 'renanmav.97' })
    .end()

  assert.property(response.body, 'token')
  response.assertStatus(200)
})
