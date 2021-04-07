const section = document.querySelectorAll('section')
//home shit
const homeLink = document.querySelector('#home-link')
const homeContent = document.querySelector('#home-content')
//signup shit
const signUpLink = document.querySelector('#signup-link')
const signUpContent = document.querySelector('#signup-content')
const signUpForm = document.querySelector('#signup-form')
//login shit
const loginLink = document.querySelector('#login-link')
const loginContent = document.querySelector('#login-content')
const loginForm = document.querySelector('#login-form')
//logout shit
const logoutLink = document.querySelector('#logout-link')
//profile shit
const profileLink = document.querySelector('#profile-link')
const profileContent = document.querySelector('#profile-content')
// nav links
homeLink.addEventListener('click', () => {
  hideSection()
  removeHidden(homeContent)
})
signUpLink.addEventListener('click', () => {
  hideSection()
  removeHidden(signUpContent)
})
loginLink.addEventListener('click', () => {
  hideSection()
  removeHidden(loginContent)
})
logoutLink.addEventListener('click', () => {
  hideSection()
  removeHidden(homeContent)
})
profileLink.addEventListener('click', () => {
  hideSection()
  removeHidden(profileContent)
})
// functions 
hideSection = () => {
  section.forEach(s => s.classList.add('hidden'))
}
removeHidden = (x) => {
  x.classList.remove('hidden')
}
addHidden = (x) => {
  x.classList.add('hidden')
}

//shows right stuff at load
if (localStorage.getItem('userId')){
  addHidden(signUpLink)
  addHidden(loginLink)
}
else{
  addHidden(logoutLink)
  addHidden(profileLink)
}

// form submission
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.querySelector('#signup-email').value
  const password = document.querySelector('#signup-password').value
  try {
    let response = await axios.post('http://localhost:3001/users', {
      email: email,
      password: password
    })
    console.log(response)
    const userId = response.data.user.id
    localStorage.setItem('userId', userId)
    addHidden(signUpLink)
    addHidden(loginLink)
    removeHidden(logoutLink)
    removeHidden(profileLink)
    hideSection()
    removeHidden(homeContent)
  } catch (error) {
    alert('email already exists')
  }
})
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-password').value
  try {
    let response = await axios.post('http://localhost:3001/users/login', {
      email: email,
      password: password
    })
    console.log(response)
    const userId = response.data.user.id
    localStorage.setItem('userId', userId)
    addHidden(signUpLink)
    addHidden(loginLink)
    removeHidden(logoutLink)
    removeHidden(profileLink)
    hideSection()
    removeHidden(homeContent)
  } catch (error) {
    alert('login failed')
  }
})

logoutLink.addEventListener('click', () => {
  hideSection()
  localStorage.removeItem('userId')
  removeHidden(homeContent)
  addHidden(logoutLink)
  addHidden(profileLink)
  removeHidden(loginLink)
  removeHidden(signUpLink)
})



