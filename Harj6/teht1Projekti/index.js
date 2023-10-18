// use express
const express = require('express') 

// create express app
const app = express()

// define port
const port = 3000

// MIDDLEWARE

// Use JSON parser text -> json object to request.body object
app.use(express.json())

// some data as a JSON format
let users = 
[
  { 'id':'1', 'name':'Kirsi Kernel' },
  { 'id':'2', 'name':'Matti Mainio' }
]

// define endpoint
app.get('/users', (request, response) => {
    response.json(users)
})

app.get('/users/:id', (request, response) => {
    //const id = request.params.id // note how you can do this in different ways!
    const { id } = request.params
    const user = users.find(user => user.id === id)
    // check if user exists or return exit code 404
    if (user) response.json(user)
    else response.status(404).end()
})

// delete one user
app.delete('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    users = users.filter(user => user.id !== id)
    // Just send "204 no content" status code back
    response.status(204).end()
})

// update user data
app.put('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    // const name = request.query.name
    const { name } = request.query
    const user = users.find(user => user.id === id)
    if (user) {
      user.name = name
      response.status(200).end()
    } else {
      response.status(204).end()
    }
})

// create user
app.post('/users/', (request, response) => {
    const maxId = Math.max(...users.map(user => user.id), 0)
    const user = request.body
    user.id = (maxId+1).toString()
    users = users.concat(user)
    response.json(user)
})

// start web-server and listen on port 3000
app.listen(port, () => {
    console.log('Example app listening on port 3000')
})