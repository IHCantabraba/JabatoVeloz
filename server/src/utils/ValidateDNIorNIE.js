export default function validateDNI(dni) {
  let number, letter, letra
  const expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/
  dni = dni.toUpperCase()

  if (expresion_regular_dni.test(dni) === true) {
    number = dni.substr(0, dni.length - 1)
    number = number.replace('X', 0)
    number = number.replace('Y', 1)
    number = number.replace('Z', 2)
    letter = dni.substr(dni.length - 1, 1)
    number = number % 23
    letra = 'TRWAGMYFPDXBNJZSQVHLCKET'
    letra = letra.substring(number, number + 1)

    if (letra != letter) {
      return false
    }
  } else {
    return false
  }
}
