// nav links
document.querySelector('#home-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#home-content').classList.remove('hidden')
})

document.querySelector('#signup-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#signup-content').classList.remove('hidden')
})

document.querySelector('#login-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#login-content').classList.remove('hidden')
})

document.querySelector('#logout-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#home-content').classList.remove('hidden')
//chapter 3
  localStorage.removeItem('userId') //clear localstorage

  document.querySelector('#login-link').classList.remove('hidden')
  document.querySelector('#signup-link').classList.remove('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
  document.querySelector('#logout-link').classList.add('hidden')


})

document.querySelector('#profile-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#profile-content').classList.remove('hidden')
})

//chapter 1
document.querySelector('#signup-form').addEventListener('submit', async (event)=> {
  event.preventDefault()
  const email = document.querySelector('#signup-email').value
  const password = document.querySelector('#signup-password').value
  // console.log(email)
  // console.log(password)
  try {
    const response = await axios.post('http://localhost:3001/users', {
      email: email,
      password: password
    })
    console.log(response)

    const userId = response.data.user.id
    localStorage.setItem('userId', userId)

  } catch (error) {
    console.log(error)
    alert('email is already taken')
  }
})

//chapter 2
document.querySelector('#login-form').addEventListener('submit', async (event)=> {
  event.preventDefault()
  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-password').value
  
  try {
    const response = await axios.post('http://localhost:3001/users/login', {
      email: email,
      password: password
    })
    console.log(response)

    const userId = response.data.user.id
    localStorage.setItem('userId', userId)

    document.querySelector('#login-link').classList.add('hidden')
    document.querySelector('#signup-link').classList.add('hidden')
    document.querySelector('#logout-link').classList.remove('hidden')
    document.querySelector('#profile-link').classList.remove('hidden')

    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
    document.querySelector('#home-content').classList.remove('hidden')
  
  } catch (error) {
    console.log(error)
    alert('login failed')
  }
})

//chapter 4
//put this f outside of any above fs, so this will happend when page loads.

// check local storage
if(localStorage.getItem('userId')){
  document.querySelector('#login-link').classList.add('hidden')
  document.querySelector('#signup-link').classList.add('hidden') //if present, show logged in state
}else{
  document.querySelector('#logout-link').classList.add('hidden')
  document.querySelector('#profile-link').classList.add('hidden') //else show logged out
}


//chapter 5

document.querySelector('#profile-link').addEventListener('submit', async (event)=> {
  event.preventDefault()
  if(localStorage.getItem('userId')){
  try {
    const response = await axios.post('http://localhost:3001/users/profile', {
      email: email
    })
    console.log(response)

    document.querySelector('#profile-link').classList.remove('hidden')
  
  } catch (error) {
    console.log(error)
  }}}