import { InvalidParamError, MissingParamError } from '../../erros'
import { badRequest, serverError } from '../../helpers/http-helper'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import type { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })
      }

      return new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
    } catch (error) {
      return serverError(error)
    }
  }
}
