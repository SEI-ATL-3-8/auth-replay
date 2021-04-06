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
  document.querySelector('#login-content').classList.remove('hidden')

  localStorage.removeItem('userId')

  document.querySelector('#login-link').classList.remove('hidden')
  document.querySelector('#signup-link').classList.remove('hidden')
  document.querySelector('#logout-link').classList.add('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
})

document.querySelector('#profile-link').addEventListener('click', async () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#profile-content').classList.remove('hidden')

  try {
    // it's a firm convention to put the id of the currently logged in user into the authorization headers, not the request body
    const response = await axios.get('http://localhost:3001/users/profile', {
      headers: {
        Authorization: localStorage.getItem('userId')
      }
    })

    document.querySelector('#profile-info').innerText = `Welcome back, ${response.data.user.email}!`

  } catch (error) {
    alert('profile not found')
  }

})

// form submissions
document.querySelector('#signup-form').addEventListener('submit', async (event) => {
  event.preventDefault()

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

    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
    document.querySelector('#home-content').classList.remove('hidden')  
  } catch (error) {
    alert('email already taken')
  }
})

document.querySelector('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  try {
    const response = await axios.post('http://localhost:3001/users/login', {
      email: document.querySelector('#login-email').value,
      password: document.querySelector('#login-password').value,
    })
    
    localStorage.setItem('userId', response.data.user.id)

    document.querySelector('#login-link').classList.add('hidden')
    document.querySelector('#signup-link').classList.add('hidden')
    document.querySelector('#logout-link').classList.remove('hidden')
    document.querySelector('#profile-link').classList.remove('hidden')

    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
    document.querySelector('#home-content').classList.remove('hidden')  
  } catch (error) {
    alert('login failed')
  }
})


// as soon as the page is loaded, show/hide the appropriate links
if (localStorage.getItem('userId')) {
  document.querySelector('#login-link').classList.add('hidden')
  document.querySelector('#signup-link').classList.add('hidden')
} else {
  document.querySelector('#logout-link').classList.add('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
}