import { Dormitory, Wakabishi1 } from '../types/dormitory'

export interface IDormitoryRepository {
  saveUsersDormitory(dormitory: Dormitory): void,
  getUsersDormitory(): Dormitory
  isSameDormitory(a: Dormitory, b: Dormitory): boolean
}

export class MockDormitoryRepository implements IDormitoryRepository {
  saveUsersDormitory(dormitory: Dormitory) {}

  getUsersDormitory() {
    return Wakabishi1
  }

  isSameDormitory(a: Dormitory, b: Dormitory) {
    return a.name === b.name
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

  isSameDormitory(a: Dormitory, b: Dormitory) {
    return a.name === b.name
  }
}