'use strict'

const Mail = use('Mail')

class ForgotPasswordMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'ForgotPasswordMail-job'
  }

  async handle ({ user, redirectUrl }) {
    console.log(`[Job ${ForgotPasswordMail.key}] start`)
    await Mail.send(
      ['emails.forgot_password'],
      {
        email: user.email,
        token: user.token,
        link: `${redirectUrl}?token=${user.token}`
      },
      message => {
        message
          .from(
            'teste@sandboxe654fa6e32744cada749ecc5e18c9494.mailgun.org',
            'Tesla Engenharia'
          )
          .to(user.email)
          .subject('Recuperação de senha')
      }
    )
    console.log(`[Job ${ForgotPasswordMail.key}] finish`)
  }
}

module.exports = ForgotPasswordMail
