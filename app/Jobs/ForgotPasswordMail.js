'use strict'

const Mail = use('Mail')
const Env = use('Env')

class ForgotPasswordMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'ForgotPasswordMail-job'
  }

  async handle ({ user, redirectUrl }) {
    try {
      console.log(`[Job ${ForgotPasswordMail.key}] start`)
      Mail.send(
        ['emails.forgot_password'],
        {
          email: user.email,
          token: user.token,
          link: `${redirectUrl}?token=${user.token}`
        },
        message => {
          message
            .from(Env.get('MAIL_USERNAME'))
            .to(user.email)
            .subject('Recuperação de senha')
        }
      )
      console.log(`[Job ${ForgotPasswordMail.key}] finish`)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = ForgotPasswordMail
