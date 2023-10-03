const user = require('../Data/user')

let arvo1 = "Petri Peltomaa"
let arvo2 = "Jyväskylä"

let name = user.getName(arvo1)
let city = user.getLocation(arvo2)
console.log(`${name} lives in ${city} and was born on ${user.birthdate}`)