require('dotenv').config()

console.log(`The name is ${process.env.DB_NAME}`)
console.log(`The username is${process.env.DB_USERNAME}`)
console.log(`The password is${process.env.DB_PASSWORD}`)