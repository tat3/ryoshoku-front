import axios from 'axios'

import { IUser, IUserRepository } from '../types/user'

class User implements IUser {
  private isAuthenticated = false

  constructor(public usernameToken: string, public passwordToken: string, private repository: IUserRepository) {
  }

  async authenticate() {
    const url = process.env.REACT_APP_API_URL + '/authenticate'
    try {
      const res = await axios.post(url, {
        username: this.usernameToken,
        password: this.passwordToken,
      })
      if (!res.data.authenticated) {
        throw Error()
      }
    } catch (e) {
      throw e
    }
    this.isAuthenticated = true
    return
  }

  async save() {
    if (!this.isAuthenticated) {
      try {
        await this.authenticate()
      } catch (e) {
        throw e
      }
    }

    if (!this.isAuthenticated) {
      return
    }
    this.repository.saveUser(this)
  }

  isAnonymous () {
    return false
  }
}



class AnonymousUser implements IUser {
  usernameToken = ''
  passwordToken = ''
  isAnonymous() {
    return true
  }
}

export { User, AnonymousUser }