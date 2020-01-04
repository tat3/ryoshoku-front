import { User } from '../models/User'
import { Encoder } from '../Encoder'
import { UserRepositoryWithLocalStorage } from './UserRepository'

class UserFactory {
  create(username: string, password: string) {
    const encoder = new Encoder(Encoder.defaultPublicKey())
    const usernameToken = encoder.encode(username)
    const passwordToken = encoder.encode(password)
    return new User(usernameToken, passwordToken, new UserRepositoryWithLocalStorage())
  }
}

export { UserFactory }