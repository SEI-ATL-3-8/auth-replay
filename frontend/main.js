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
})

document.querySelector('#profile-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#profile-content').classList.remove('hidden')
})

let loginState = 0

document.querySelector('#signup-form').addEventListener('submit', async (event) => {
  // make a request, POST http://localhost:3001/users, send a body
  event.preventDefault()

  const email = document.querySelector('#signup-email').value 
  const password = document.querySelector('#signup-password').value

  try {
  const response = await axios.post('http://localhost:3001/users', {
    email: email,
    password: password
  })
  const userId = response.data.user.id
  localStorage.setItem('userId', userId)

} catch (error) {
  console.log(error)
  console.log('Email already taken')
}
})

document.querySelector('#profile-link').addEventListener('click', async (event) => {
  // make a request, POST http://localhost:3001/users/profile, send a body
  event.preventDefault()

  const userId = localStorage.getItem('userId')

  try {
  const response = await axios.get('http://localhost:3001/users/profile', {
    params: {
      userId: userId
    }
  })
 


  document.querySelectorAll('section').forEach(s =>
    s.classList.add('hidden'))

} catch (error) {
  console.log(error)
  console.log('profile link failed')
}
})

document.querySelector('#login-form').addEventListener('submit', async (event) => {
  // make a request, POST http://localhost:3001/users, send a body
  event.preventDefault()

  const email = document.querySelector('#login-email').value 
  const password = document.querySelector('#login-password'). value

  try {
  const response = await axios.post('http://localhost:3001/users/login', {
    email: email,
    password: password
  })
  const userId = response.data.user.id
  localStorage.setItem('userId', userId)

  document.querySelectorAll('section').forEach(s =>
    s.classList.add('hidden'))

  document.querySelector('#home-content').classList.remove('hidden')

  document.querySelector('#login-link').classList.add('hidden')
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#profile-link').classList.remove('hidden')
  document.querySelector('#logout-link').classList.remove('hidden')

} catch (error) {
  console.log(error)
  console.log('login failed')
}
})

document.querySelector('#logout-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s =>
    s.classList.add('hidden'))

    document.querySelector('#home-content').classList.remove('hidden')

    localStorage.removeItem('userId')
    
    document.querySelector('#login-link').classList.remove('hidden')
    document.querySelector('#signup-link').classList.remove('hidden')
    document.querySelector('#profile-link').classList.add('hidden')
    document.querySelector('#logout-link').classList.add('hidden')
    
  })

  document.querySelector('#logout-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s =>
    s.classList.add('hidden'))

    document.querySelector('#home-content').classList.remove('hidden')

    localStorage.removeItem('userId')
    
    document.querySelector('#login-link').classList.remove('hidden')
    document.querySelector('#signup-link').classList.remove('hidden')
    document.querySelector('#profile-link').classList.add('hidden')
    document.querySelector('#logout-link').classList.add('hidden')
    
  })




//as soon as page loads, see if someone is logged in or not

if ( localStorage.getItem('userId')) {
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#login-link').classList.add('hidden')
}
else {
  document.querySelector('#logout-link').classList.add('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
  }
