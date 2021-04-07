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


try {
  const response = await axios.post('http://localhost:3001/users', {
      email: document.querySelector('#signup-email').value,
      password: document.querySelector('#signup-password').value,
  })

  localStorage.setItem('userId', response.data.user.id)

  document.querySelector('#login-link').classList.add('hidden')
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#logout-link').classList.remove('hidden')
  document.querySelector('#profile-link').classList.remove('hidden')
} catch (error) {
  alert('email is not avaliable')
}


document.querySelector('#login-form').addEventListener('submit', async(event) => {
event.preventDefault()

try {
  const response = await axios.post('http://localhost:3001/users', {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value
  })
  localStorage.setItem('userId', response.data.user.id)

  document.querySelector('#login-link').classList.add('hidden')
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#logout-link').classList.remove('hidden')
  document.querySelector('#profile-link').classList.remove('hidden')

} catch (error) {
  alert('login unsuccessful!')
}
})


const showLoggedIn = () => {
  document.querySelector('#logout-link').classList.remove('hidden')
  document.querySelector('#profile-link').classList.remove('hidden')
  document.querySelector('#login-link').classList.add('hidden')
  document.querySelector('#signup-link').classList.add('hidden')
}
