const homeLink = document.querySelector('#home-link')
const section = document.querySelectorAll('section')
const homeContent = document.querySelector('#home-content')
const signUpLink = document.querySelector('#signup-link')
const signUpContent = document.querySelector('#signup-content')
const loginLink = document.querySelector('#login-link')
const loginContent = document.querySelector('#login-content')
const logoutLink = document.querySelector('#logout-link')
const profileLink = document.querySelector('#profile-link')
const profileContent = document.querySelector('#profile-content')
// nav links
homeLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')
})
signUpLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  signUpContent.classList.remove('hidden')
})
loginLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  loginContent.classList.remove('hidden')
})
logoutLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  homeContent.classList.remove('hidden')
})
profileLink.addEventListener('click', () => {
  section.forEach(s => s.classList.add('hidden'))
  profileContent.classList.remove('hidden')
})
