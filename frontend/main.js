// nav links
const homeLink = document.querySelector('#home-link')
const section = document.querySelectorAll('section')
const homeContent = document.querySelector('#home-content')
const signLink = document.querySelector('#signup-link')
const signupContent = document.querySelector('#signup-content')
const loginLink = document.querySelector('#login-link')
const loginContent = document.querySelector('#login-content')
const logoutLink = document.querySelector('#logout-link')
const profileLink = document.querySelector('#profile-link')
const profileContent = document.querySelector('#profile-content')
const signupForm = document.querySelector('#signup-form')
const loginForm = document.querySelector('#login-form')
const profileInfo = document.querySelector('#profile-info')


homeLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')
})

signLink.addEventListener('click', () => {
 section.forEach(s => s.classList.add('hidden'))
  signupContent.classList.remove('hidden')
})

loginLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  loginContent.classList.remove('hidden')
})

logoutLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')

  localStorage.removeItem('userId')

  loginLink.classList.remove('hidden')
  signupForm.classList.remove('hidden')
  profileLink.classList.add('hidden')
  logoutLink.classList.add('hidden')
})

profileLink.addEventListener('click', async () => {
  section.forEach(s => s.classList.add('hidden'))
  profileContent.classList.remove('hidden')
try {
  const userId = localStorage.getItem('userId')

  const response = await axios.get('http://localhost:3001/users/profile', {
    params: {
      id: userId
    }
  }) 
  profileInfo.innerHTML=`Welcome ${response.data.user.email}, your password is: ${response.data.user.password}`;
} catch (error) {
  alert ('invalid user')
}

})

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const email = document.querySelector('#signup-email').value
  const password = document.querySelector('#signup-password').value

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
  alert('email is already taken!')
}
})

// logging forms

loginForm.addEventListener('submit', async (event) => {
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
  loginLink.classList.add('hidden')
  signLink.classList.add('hidden')
  logoutLink.classList.remove('hidden')
  profileLink.classList.remove('hidden')

  section.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')
  } catch (error) {
    console.log(error)
    alert('login failed')
  }
})

if (localStorage.getItem('userId')) {
  signLink.classList.add('hidden')
  loginLink.classList.add('hidden')
} else {
  logoutLink.classList.add('hidden')
  profileLink.classList.add('hidden')
}


