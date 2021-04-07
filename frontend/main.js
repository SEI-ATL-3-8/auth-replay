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

const profileInfo = document.querySelector('#profile-info')

const signupForm = document.querySelector('#signup-form')
const loginForm = document.querySelector('#login-form')

// NAV LINKS
homeLink.addEventListener('click', () => {
  goHome()
})

signupLink.addEventListener('click', () => {
  hideAllSections()
  signupContent.classList.remove('hidden')
})

loginLink.addEventListener('click', () => {
  hideAllSections()
  loginContent.classList.remove('hidden')
})

logoutLink.addEventListener('click', () => {
  localStorage.removeItem('userId')
  goHome()
  checkLoggedIn()
})

profileLink.addEventListener('click', async () => {
  hideAllSections()
  profileContent.classList.remove('hidden')
  try {
    const userId = localStorage.getItem('userId')
    console.log(userId)

    const response = await axios.get('http://localhost:3001/users/profile', {
      params: {
        userId: userId
      }
    })
    console.log('AXIOS RESPONSE', response.status, response.statusText, response)
    if(response.status === 200){
      const user = response.data.user
      profileInfo.innerHTML = `<strong>email:</strong> ${user.email}; <strong>password:</strong> ${user.password}`
    }
  } catch (error) {
    console.log(error)
  }
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
    if(response.status === 200){
      goHome()
      checkLoggedIn()
    }
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
    if(response.status === 200){
      goHome()
      checkLoggedIn()
    }
  } catch (error) {
    console.log('ERROR', error)
  }
})

// REUSABLE FUNCTIONS
function hideAllSections() {
  sections.forEach(s => s.classList.add('hidden'))
}

function goHome() {
  hideAllSections()
  homeContent.classList.remove('hidden')
}

function checkLoggedIn() {
  if(localStorage.getItem('userId')){
    // goHome()
    signupLink.classList.add('hidden')
    loginLink.classList.add('hidden')
    logoutLink.classList.remove('hidden')
    profileLink.classList.remove('hidden')
  } else {
    signupLink.classList.remove('hidden')
    loginLink.classList.remove('hidden')
    logoutLink.classList.add('hidden')
    profileLink.classList.add('hidden')
  }
}
checkLoggedIn()