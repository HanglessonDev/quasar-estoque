export default function useValidations () {
  const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  //  valida o tamanho da senha >=6
  const isPassword = (password) => {
    return password.length >= 6
  }

  // valida campo vazio
  const isRequired = (field) => {
    return field.length > 0
  }

  return {
    isEmail,
    isPassword,
    isRequired
  }
}
