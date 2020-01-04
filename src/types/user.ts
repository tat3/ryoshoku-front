export interface IUser {
  usernameToken: string
  passwordToken: string
  isAnonymous(): boolean
}

export interface IUserRepository {
  saveUser(user: IUser): void,
  getStoredUser(): IUser
}