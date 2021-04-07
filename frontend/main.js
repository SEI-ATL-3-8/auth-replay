

const baseURL = 'http://localhost:3001';
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
  // console.log(localStorage)
  document.querySelector('#login-link').classList.remove('hidden')
  document.querySelector('#signup-link').classList.remove('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
  document.querySelector('#logout-link').classList.add('hidden')
})

document.querySelector('#profile-link').addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  document.querySelector('#profile-content').classList.remove('hidden')
})

// form submission
document.querySelector('#signup-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  const email = document.querySelector('#signup-email').value
  const password = document.querySelector('#signup-password').value

  try{
      console.log("in try")
    const response = await axios.post(baseURL + '/users', {
      email: email,
      password: password
    });

    console.log(response)

    const userId = response.data.newUser.id

    // axios.post('/login', {
    //   firstName: 'Finn',
    //   lastName: 'Williams'
    // });
    localStorage.setItem('userId', userId)

  }catch(error){
    alert('already taken')
    console.log(error)
  }

});

document.querySelector('#login-form').addEventListener('submit', async (event) => {
  event.preventDefault()

  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-password').value

  try{
      console.log("in try")
    const response = await axios.post(baseURL + '/users/login', {
      email: email,
      password: password
    });

    console.log(response)

    const userId = response.data.user.id

    // axios.post('/login', {
    //   firstName: 'Finn',
    //   lastName: 'Williams'
    // });
    localStorage.setItem('userId', userId)

    document.querySelector('#login-link').classList.add('hidden')
    document.querySelector('#signup-link').classList.add('hidden')
    document.querySelector('#logout-link').classList.remove('hidden')
    document.querySelector('#profile-link').classList.remove('hidden')

    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
    document.querySelector('#home-content').classList.remove('hidden')

  }catch(error){
    alert('invalid login')
    console.log(error)
  }

});

if (localStorage.getItem('userId')) {
  document.querySelector('#signup-link').classList.add('hidden')
  document.querySelector('#login-link').classList.add('hidden')
} else {

  document.querySelector('#logout-link').classList.add('hidden')
  document.querySelector('#profile-link').classList.add('hidden')
}