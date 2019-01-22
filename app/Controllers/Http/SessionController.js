'use strict'

const Youch = require('youch')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)

      return token
    } catch (err) {
      const youch = new Youch(err, request.request)
      const { error } = await youch.toJSON()

      switch (error.name) {
        case 'PasswordMisMatchException':
          return response
            .status(err.status)
            .send({ error: { message: 'Senha inválida' } })
        case 'UserNotFoundException':
          return response.status(err.status).send({
            error: { message: 'Usuário não cadastrado' }
          })
        default:
          return response.status(err.status).send({ errorJSON: error })
      }
    }
  }
}

module.exports = SessionController
