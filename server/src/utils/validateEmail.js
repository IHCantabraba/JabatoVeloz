export default function ValidateEmail(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (re.test(email)) {
    console.log('Email format is correct')
  } else {
    console.log('Email format incorrect')
  }

  return re.test(email)
}
