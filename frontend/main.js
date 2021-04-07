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
    document.querySelector('#signup-link').classList.remove('hidden')
    document.querySelector('#login-link').classList.remove('hidden')
    document.querySelector('#logout-link').classList.add('hidden')
    document.querySelector('#profile-link').classList.add('hidden')

    localStorage.removeItem('userId')
})

document.querySelector('#profile-link').addEventListener('click', async () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#profile-content').classList.remove('hidden')

  try {
      const response = await axios.get('http://localhost:3001/users/profile', {
         headers: {
            Authorization: localStorage.getItem('userId')
         }
      })

      document.querySelector('#profile-info').innerText = `Welcome ${response.data.user.email}! Good to see you again.`
  } catch (error) {
      alert('Profile not found')
  }


})


// Signup form
document.querySelector('#signup-form').addEventListener('submit', async (event) => {
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
      alert('Email is already taken!')
  }
})


// Login form
document.querySelector('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-password').value

  try {
      const response = await axios.post('http://localhost:3001/users/login', {
      email: email,
      password: password
      })
        document.querySelector('#signup-link').classList.add('hidden')
        document.querySelector('#login-link').classList.add('hidden')
        document.querySelector('#logout-link').classList.remove('hidden')
        document.querySelector('#profile-link').classList.remove('hidden')

        document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
        document.querySelector('#home-content').classList.remove('hidden')
      
      
      console.log(response)
      
      const userId = response.data.user.id
      localStorage.setItem('userId', userId)
  } catch (error) {
      alert('Login failed')
      document.querySelector('#login-email').value = ''
      document.querySelector('#login-password').value = ''
  }
})



// On Load

if (localStorage.getItem('userId')) {
      document.querySelector('#signup-link').classList.add('hidden')
      document.querySelector('#login-link').classList.add('hidden')
} else {
      document.querySelector('#logout-link').classList.add('hidden')
      document.querySelector('#profile-link').classList.add('hidden')
}