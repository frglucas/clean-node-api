import { MissingParamError } from '../../erros'
import { badRequest } from '../../helpers/http-helper'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'
import type { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    if (!email) {
      return new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    }
    if (!password) {
      return new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
    }
    this.emailValidator.isValid(email)
    return new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
  }
}
