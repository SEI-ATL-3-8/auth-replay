
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
  document.querySelector('#home-content').classList.remove('hidden');
  localStorage.removeItem('userId');
  authenticate();

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
      if (response.data.message === 'success') {
        const { userId }= response.data;
    
        localStorage.setItem('userId', userId);
        authenticate();
        document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
        document.querySelector('#home-content').classList.remove('hidden')
      }
 
    }
    catch({response}) {
      showErrorMessage(response.data.error);
    }
});

// Form Event Listener Login Account
document.getElementById('login-form').addEventListener('submit', async event => {
  event.preventDefault();

  const formParams = {
    email : event.target.elements[0].value,
    password: event.target.elements[1].value
  };

  try {
    const response = await axios.post('http://localhost:3001/users/login', formParams);
    if (response.data.message === 'success') {
      const { userId }= response.data;
      localStorage.setItem('userId', userId);
      authenticate();
      document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
      document.querySelector('#home-content').classList.remove('hidden')
    }


  }
  catch({response}) {
    showErrorMessage(response.data.error);
  }

});

document.getElementById('profile-link').addEventListener('click', async () => {
  authenticate();
  const userId = localStorage.getItem('userId');
  try {
    const response = await axios.get('http://localhost:3001/users/profile',{params: {userId}});
    if (response.data.message === 'success') {
      document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
      document.querySelector('#profile-content').innerText = `email: ${response.data.user.email} \n password: ${response.data.user.password}`
      document.querySelector('#profile-content').classList.remove('hidden');
    }
  }
  catch({response}) {
    showErrorMessage(response.data.error);
  }

});

const loggedOut = () => {
  document.querySelector('#login-link').classList.remove('hidden');
  document.querySelector('#signup-link').classList.remove('hidden');
  document.querySelector('#logout-link').classList.add('hidden');
  document.querySelector('#profile-link').classList.add('hidden');
}

const loggedIn = () => {
  document.querySelector('#login-link').classList.add('hidden');
  document.querySelector('#signup-link').classList.add('hidden');
  document.querySelector('#profile-link').classList.remove('hidden');
  document.querySelector('#logout-link').classList.remove('hidden');
}


// Event Listener for Logout Button


const authenticate = async () => {
    
    if (localStorage.getItem('userId')) {
      try {
        const response = await axios.get('http://localhost:3001/users/verify', {
            params: {userId: localStorage.getItem('userId')}
        });

        if (response.data.message === 'success') {
          loggedIn();
        }

      }
      catch({response}) {
        showErrorMessage(response.data.error);
        loggedOut();
      }
    }

    else {
      loggedOut();
    }
}



authenticate();