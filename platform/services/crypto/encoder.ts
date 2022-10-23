import util from 'tweetnacl-util'

export const encode = (inputToBase64: string): string =>
  util.encodeBase64(util.decodeUTF8(inputToBase64))

export const decode = (inputInBase64: string): string =>
  util.encodeUTF8(util.decodeBase64(inputInBase64))
