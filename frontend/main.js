// nav links variables
const homeLink = document.querySelector('#home-link')
const signupLink = document.querySelector('#signup-link')
const longinLink = document.querySelector('#login-link')
const logoutLink = document.querySelector('#logout-link')
const profileLink = document.querySelector('#profile-link')

//content variables
const homeContent = document.querySelector('#home-content')
const signupContent = document.querySelector('#signup-content')
const loginContent = document.querySelector('#login-content')
const profileContent = document.querySelector('#profile-content')

//section variable
const section = document.querySelectorAll('section')

//form variable
const signupForm = document.querySelector('#signup-form')
const loginForm = document.querySelector('#login-form')



homeLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')
})

signupLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  signupContent.classList.remove('hidden')
})

longinLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  loginContent.classList.remove('hidden')
})

logoutLink.addEventListener('click', () => {
  
  section.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')

  localStorage.removeItem('userId')

  document.querySelector('#login-link').classList.remove('hidden')
  document.querySelector('#signup-link').classList.remove('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
  document.querySelector('#logout-link').classList.add('hidden')
})

profileLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  profileContent.classList.remove('hidden')
})

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const email = document.querySelector('#signup-email').value
  const password = document.querySelector('#signup-password').value

  try{
    const response = await axios.post('http://localhost:3001/users', {
      email: email,
      password: password
    })

    const userId = response.data.user.id
    localStorage.setItem('userId', userId)

  }catch (error) {
    alert('email already exist')
  }
})

document.querySelector('#login-form').addEventListener('submit', async (event) => {
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

profileLink.addEventListener('click', async() => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  profileContent.classList.remove('hidden')
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.get('http://localhost:3001/users/profile', {
      params: {
        id: userId
      }
    })

    if (response.status === 200) {
      
      document.querySelector('#profile-info').innerHTML = `User: email: ${response.data.user.email}, password: ${response.data.user.password}`
    }

    
  }catch (error) {
    console.log(error)
    alert('invalid user')
  }
})

if (localStorage.getItem('useId')) {
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#login-link').classList.add('hidden')
}else {
  document.querySelector('#logout-link').classList.add('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
}
