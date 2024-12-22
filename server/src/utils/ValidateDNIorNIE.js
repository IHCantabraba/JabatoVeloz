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
      console.log('DNI or NIE erróneo')
      return false
    } else {
      console.log('DNI or NIE correcto')
    }
  } else {
    console.log('Formato de DNI o NIE erróneo')
    return false
  }
}
// const sample = [
//   '71657311Y',
//   '71657311y',
//   'X9847155G',
//   'Y4554066B',
//   'Y4554066b',
//   'X1234567A'
// ]

// for (let i = 0; i <= sample.length - 1; i++) {
//   console.log(`Validating ${sample[i]} `)
//   validateDNI(sample[i])
//   console.log('\n')
// }
