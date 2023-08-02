import { MissingParamError } from '../../erros'
import { badRequest } from '../../helpers/http-helper'
import type { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
  }
}
