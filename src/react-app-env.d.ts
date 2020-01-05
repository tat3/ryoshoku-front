/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_GA: string
    readonly REACT_APP_API_URL: string
    readonly REACT_APP_PUBLIC_KEY: string
  }
}