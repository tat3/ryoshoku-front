import { User } from '../models/User'
import { Encoder } from '../Encoder'
import { UserRepositoryWithLocalStorage } from './UserRepository'
import { DormitoryRepositoryWithLocalStorage } from './DormitoryRepository'

class UserFactory {
  create(username: string, password: string) {
    const encoder = new Encoder(Encoder.defaultPublicKey())
    const usernameToken = encoder.encode(username)
    const passwordToken = encoder.encode(password)
    const dormitoryRepository = new DormitoryRepositoryWithLocalStorage()
    const dormitory = dormitoryRepository.getUsersDormitory()
    return new User(
      usernameToken, passwordToken,
      dormitory, new UserRepositoryWithLocalStorage())
  }
}

export { UserFactory }