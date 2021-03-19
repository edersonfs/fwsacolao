export function validateNumber(number) {
  return typeof number === 'number'
}

export function validateHasUppercase(text) {
  const hasUppercaseRegex = /.*[A-Z]+.*/g
  return hasUppercaseRegex.test(text)
}

export function validateHasLowercase(text) {
  const hasLowercaseRegex = /.*[a-z]+.*/g
  return hasLowercaseRegex.test(text)
}

export function validateHasNumber(text) {
  const hasNumberRegex = /.*[0-9]+.*/g
  return hasNumberRegex.test(text)
}

export function validateHasCharacter(text) {
  const hasNumberRegex = /.*[a-zA-Z]+.*/g
  return hasNumberRegex.test(text)
}

export function validateOnlyNumber(text) {
  return text.replace(/\D/g, '')
}

export function validateMinLength(text, minLength) {
  return text.length >= minLength
}

export function validateMaxLength(text, minLength) {
  return text.length <= minLength
}

export function validateLength(text, length) {
  return text.length === length
}

export function validateEmail(text) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return reg.test(text)
}

export function validateFullName(text) {
  if(text) {
    const textTrim = text.trim()
    const reg = /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/
    return reg.test(textTrim)
  }
}
