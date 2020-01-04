import { IUser, IUserRepository } from '../types/user'
import { User, AnonymousUser } from '../models/User'

export class MockUserRepository implements IUserRepository {
  saveUser(user: IUser) {}

  getStoredUser() {
    return new AnonymousUser()
  }
}

export class UserRepositoryWithLocalStorage implements IUserRepository {
  saveUser(user: IUser) {
    if (user.isAnonymous()) {
      return
    }
    localStorage.setItem('user', JSON.stringify({
      usernameToken: user.usernameToken,
      passwordToken: user.passwordToken,
    }))
  }

  getStoredUser(): IUser {
    const json = localStorage.getItem('user')
    if (json === null) {
      return new AnonymousUser()
    }
    const data = JSON.parse(json)
    const usernameToken = data.usernameToken
    const passwordToken = data.passwordToken
    if (!(typeof usernameToken !== 'string' && typeof passwordToken !== 'string')) {
      return new AnonymousUser()
    }
    return new User(usernameToken, passwordToken, this)
  }
}
