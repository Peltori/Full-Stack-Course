function init() {
  let infoText = document.getElementById('infoText')
  infoText.innerHTML = 'Loading todos, please wait...'
  loadTodos()
}

async function loadTodos() {
  // change ip and port if needed
  let response = await fetch('http://localhost:3000/todos')
  let todos = await response.json()
  console.log(todos)
  showTodos(todos)
}

// create function for li elements
function createTodoListItem(todo) {
  // create a new  LI element
  let li = document.createElement('li')
  // create a new id attribute
  let li_attr = document.createAttribute('id')
  // add todo id value to attribute
  li_attr.value = todo._id
  // add attribute to LI element
  li.setAttributeNode(li_attr)
  // add a new text node with todo text
  let text = document.createTextNode(todo.text)
  // add text node to LI element
  li.appendChild(text)
  // create a new SPAN element for editing the todo
  let spanEdit = document.createElement('span')
  // create a new attribute for edit
  let spanEdit_attr = document.createAttribute('class')
  // add edit value
  spanEdit_attr.value = 'edit'
  // add attribute to the SPAN edit element 
  spanEdit.setAttributeNode(spanEdit_attr)
  // create a text node to SPAN edit element
  let edit = document.createTextNode(' Edit ')
  // add the text node to SPAN edit element
  spanEdit.appendChild(edit)
  // add event listener to SPAN edit element, onclick event to call editTodo function with the unique id and text
  spanEdit.onclick = function() { updateTodo(todo) }
  // add SPAN element to LI element
  li.appendChild(spanEdit)
  // create a new SPAN element, x char -> delete todo
  let span = document.createElement('span')
  // create a new attribute
  let span_attr = document.createAttribute('class')
  // add delete value (look css)
  span_attr.value = 'delete'
  // add attribute to SPAN element 
  span.setAttributeNode(span_attr)
  // create a text node with x text
  let x = document.createTextNode(' x ')
  // add text node to SPAN element 
  span.appendChild(x)
  // add event listener to SPAN element, onclick event call removeTodo function
  span.onclick = function() { removeTodo(todo._id) }
  // add SPAN element to LI element
  li.appendChild(span)
  // return created LI element 
  // will be following formula: <li>Call Esa!<span class="remove">x</span></li>
  return li
}

function showTodos(todos) {
  let todosList = document.getElementById('todosList')
  let infoText = document.getElementById('infoText')
  // if no todos then display text "No todos"
  if (todos.length === 0) {
    infoText.innerHTML = 'No Todos'
  } else {    
    todos.forEach(todo => {
        let li = createTodoListItem(todo)        
        todosList.appendChild(li)
    })
    infoText.innerHTML = ''
  }
}

// add todo function
async function addTodo() {
  let newTodo = document.getElementById('newTodo')
  const data = { 'text': newTodo.value }
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let todo = await response.json()
  let todosList = document.getElementById('todosList')
  let li = createTodoListItem(todo)
  todosList.appendChild(li)

  let infoText = document.getElementById('infoText')
  infoText.innerHTML = ''
  newTodo.value = ''
}

// remove todo function
async function removeTodo(id) {
  const response = await fetch('http://localhost:3000/todos/'+id, {
    method: 'DELETE'
  })
  let responseJson = await response.json()
  let li = document.getElementById(id)
  li.remove()

  let todosList = document.getElementById('todosList')
  if (!todosList.hasChildNodes()) {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'No Todos'
  }
}

// update todo function
async function updateTodo(todo) {
let newTodo = document.getElementById('newTodo')
let addButton = document.getElementById('addButton')

newTodo.value = todo.text
addButton.setAttribute('onclick', "saveTodo('"+ todo._id +"')")
addButton.innerHTML = 'Save';
addButton.style.backgroundColor = 'yellow'
}

async function saveTodo(id) {
let newTodo = document.getElementById('newTodo')
let addButton = document.getElementById('addButton')

const data = { 'text': newTodo.value }
const response = await fetch('http://localhost:3000/todos/'+id, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
if (response.status == 200) {
  const ul = document.getElementById("todosList")
  const li = document.getElementById(id)
  let todo = await response.json()
  const newLi = createTodoListItem(todo)
  ul.replaceChild(newLi, li)

} else {
  let infoText = document.getElementById('infoText')
  infoText.innerHTML = 'Cannot update todo'
}
  newTodo.value = ''
  addButton.setAttribute('onclick', "addTodo()")
  addButton.innerHTML = 'Add'
  addButton.style.backgroundColor = ''

  let infoText = document.getElementById('infoText')
  infoText.innerHTML = ''
}