'use strict'

const crypto = require('crypto')
const moment = require('moment')
const Kue = use('Kue')
const ForgotPasswordJob = use('App/Jobs/ForgotPasswordMail')
const User = use('App/Models/User')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')

      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Kue.dispatch(
        ForgotPasswordJob.key,
        {
          user,
          redirectUrl: request.input('redirect_url')
        },
        {
          attempts: 3
        }
      )
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Email inexistente' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'Token expired' } })
      }

      user.token = null
      user.token_created_at = null

      user.password = password

      await user.save()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Something went wrong' } })
    }
  }
}

module.exports = ForgotPasswordController
