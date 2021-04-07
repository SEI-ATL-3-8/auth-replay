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
    
  localStorage.removeItem('userId')

  document.querySelector('#signup-link').classList.remove('hidden')
  document.querySelector('#login-link').classList.remove('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
  document.querySelector('#logout-link').classList.add('hidden')
})

document.querySelector('#profile-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#profile-content').classList.remove('hidden')
})


document.querySelector('#signup-form').addEventListener('submit', event => {
  event.preventDefault()
  const email = document.querySelector('#signup-email').value
  const password = document.querySelector('#signup-password').value
  axios.post('http://localhost:3001/user', {
    email: email,
    password: password
  }).then(res => {
    console.log(res);
  })
  document.querySelector('#signup-email').value = null
  document.querySelector('#signup-password').value = null
})

document.querySelector('#login-form').addEventListener('submit', event => {
  event.preventDefault()
  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-password').value
  axios.post('http://localhost:3001/user/login', {
    email: email,
    password: password
  }).then(res => {
    const userId = res.data.user.id
    localStorage.setItem('userIdLoggedIn', userId)
    document.querySelector('#signup-link').classList.add('hidden')
    document.querySelector('#login-link').classList.add('hidden')
    document.querySelector('#logout-link').classList.remove('hidden')
    document.querySelector('#profile-link').classList.remove('hidden')
  })
  document.querySelector('#login-email').value = null
  document.querySelector('#login-password').value = null
})

document.querySelector('#profile-link').addEventListener('click', e =>{
  if (localStorage.getItem('userIdLoggedIn')) {
    console.log(localStorage.getItem('userIdLoggedIn'));
    axios.get('http://localhost:3001/user/verify', {
      id: localStorage.getItem('userIdLoggedIn')
    }).then(res => {
      console.log(res);
      if (res.data.error) {
        console.log('hi');
        localStorage.removeItem('userIdLoggedIn')
        document.querySelector('#profile-info').innerHTML = 'You arent supposed to be here r u?'
      } else {
        document.querySelector('#profile-info').innerHTML = res.data.user.email
      }
    })
  }
})

if (localStorage.getItem('userIdLoggedIn')) {
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#login-link').classList.add('hidden')
} else {
  document.querySelector('#logout-link').classList.add('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
}