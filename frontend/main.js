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

const showErrorMessage = async (errorMessage) => {
  document.querySelector('#error-message').classList.remove('hidden');
  document.querySelector('#error-message').children[0].innerText = errorMessage;


  const timer = setTimeout(() => {
    document.querySelector('#error-message').classList.add('hidden');
    document.querySelector('#error-message').children[0].innerText = "";
    clearInterval(timer);
  }, 2000);

};

//Form Event Listener Create Account
document.getElementById('signup-form').addEventListener('submit', async event => {
    event.preventDefault();
  
    const formParams = {
      email : event.target.elements[0].value,
      password: event.target.elements[1].value
    };

    try {
      const response = await axios.post('http://localhost:3001/users', formParams);
      const userId = response.data.user.id;
    
      localStorage.setItem('userId', userId);
    }
    catch({response}) {
      showErrorMessage(response.data.error);
    }
});

// Form Event Listener Login Account

const authenticate = () => {
  
}