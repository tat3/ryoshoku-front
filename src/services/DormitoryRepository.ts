import { Dormitory, Wakabishi1 } from '../types/dormitory'

export interface IDormitoryRepository {
  saveUsersDormitory(dormitory: Dormitory): void,
  getUsersDormitory(): Dormitory
}

export class MockDormitoryRepository implements IDormitoryRepository {
  saveUsersDormitory(dormitory: Dormitory) {}

  getUsersDormitory() {
    return Wakabishi1
  }
}

export class DormitoryRepositoryWithLocalStorage implements IDormitoryRepository {
  saveUsersDormitory(dormitory: Dormitory) {
    localStorage.setItem('usersDormitory', JSON.stringify(dormitory))
  }

  getUsersDormitory() {
    const json = localStorage.getItem('usersDormitory')
    if (json === null) {
      return Wakabishi1
    }
    return JSON.parse(json) as Dormitory
  }
}