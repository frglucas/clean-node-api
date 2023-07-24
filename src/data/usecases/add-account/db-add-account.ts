import type { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import type { AccountModel } from '../../../domain/models/account'
import type { Encrypter } from './protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    const accountFake = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    return new Promise(resolve => { resolve(accountFake) })
  }
}
