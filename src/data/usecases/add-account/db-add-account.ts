import type { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'

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
