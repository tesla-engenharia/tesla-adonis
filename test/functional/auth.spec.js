'use strict'

const { test, trait } = use('Test/Suite')('Auth')
const User = use('App/Models/User')

trait('Test/ApiClient')

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
