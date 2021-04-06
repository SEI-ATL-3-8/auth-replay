// DOM SELECTORS
const sections = document.querySelectorAll('section')
const homeLink = document.querySelector('#home-link')
const signupLink = document.querySelector('#signup-link')
const loginLink = document.querySelector('#login-link')
const logoutLink = document.querySelector('#logout-link')
const profileLink = document.querySelector('#profile-link')
const homeContent = document.querySelector('#home-content')
const signupContent = document.querySelector('#signup-content')
const loginContent = document.querySelector('#login-content')
const profileContent = document.querySelector('#profile-content')

const signupForm = document.querySelector('#signup-form')
const loginForm = document.querySelector('#login-form')

// NAV LINKS
homeLink.addEventListener('click', () => {
  sections.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')
})

signupLink.addEventListener('click', () => {
  sections.forEach(s => s.classList.add('hidden'))
  signupContent.classList.remove('hidden')
})

loginLink.addEventListener('click', () => {
  sections.forEach(s => s.classList.add('hidden'))
  loginContent.classList.remove('hidden')
})

logoutLink.addEventListener('click', () => {
  sections.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')
})

profileLink.addEventListener('click', () => {
  sections.forEach(s => s.classList.add('hidden'))
  profileContent.classList.remove('hidden')
})


// FORM SUBMISSION
// USER SIGNUP
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('SIGNUP FORM SUBMITTED!')
  try {
    // grab user input
    const email = document.querySelector('#signup-email').value
    const password = document.querySelector('#signup-password').value
  
    const response = await axios.post('http://localhost:3001/users', {
      email: email,
      password: password
    })
    console.log('AXIOS RESPONSE', response.status, response.statusText)
    const userId = response.data.user.id
    localStorage.setItem('userId', userId)
  } catch (error) {
    console.log('ERROR', error)
  }
})

// USER LOGIN
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('LOGIN FORM SUBMITTED!')
  try {
    // grab user input
    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value
  
    const response = await axios.post('http://localhost:3001/users/login', {
      email: email,
      password: password
    })
    console.log('AXIOS RESPONSE', response.status, response.statusText)
    const userId = response.data.user.id
    localStorage.setItem('userId', userId)
  } catch (error) {
    console.log('ERROR', error)
  }
})

// USER LOGOUT
logoutLink.addEventListener('click', (e) => {
  localStorage.removeItem('userId')
  homeLink.click()
})