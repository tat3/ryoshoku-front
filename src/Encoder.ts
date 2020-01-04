import crypto from 'crypto'

class Encoder {
  constructor(private publicKey: string) {
  }

  encode(data: string) {
    const buffer = Buffer.from(data)
    const encrypted = crypto.publicEncrypt(this.publicKey, buffer)
    return encrypted.toString('base64')
  }

  static defaultPublicKey() {
    return process.env.REACT_APP_PUBLIC_KEY.replace(/\\n/g, '\n')
  }
}

export { Encoder }