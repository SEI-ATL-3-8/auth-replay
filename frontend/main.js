//HTML ELEMENTS
//nav links
const allLinks = document.querySelectorAll('.nav-link')
const homeLink = document.querySelector('#home-link');
const signUpLink = document.querySelector('#signup-link');
const loginLink = document.querySelector('#login-link');
const logOutLink = document.querySelector('#logout-link');
const profileLink = document.querySelector('#profile-link');
//sections
const allSections = document.querySelectorAll('section');
const homeSection = document.querySelector('#home-content');
const signUpSection = document.querySelector('#signup-content');
const loginSection = document.querySelector('#login-content');
const profileSection = document.querySelector('#profile-content');
const profileInfo = document.querySelector('#profile-info');
//forms
const signUpForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const signUpEmail = document.querySelector('#signup-email');
const signUpPassword = document.querySelector('#signup-password');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');


//FUNCTIONS
const hideAllSections = () => {
  allSections.forEach(s => s.classList.add('hidden'));
}

const displayLoggedIn = () => {
  allLinks.forEach(l => l.classList.add('hidden'));
  homeLink.classList.remove('hidden');
  logOutLink.classList.remove('hidden');
  profileLink.classList.remove('hidden');
  hideAllSections();
  homeSection.classList.remove('hidden');
}

const displayLoggedOut = () => {
  allLinks.forEach(l => l.classList.add('hidden'));
  homeLink.classList.remove('hidden');
  signUpLink.classList.remove('hidden');
  loginLink.classList.remove('hidden');
  hideAllSections();
  homeSection.classList.remove('hidden');
}

const getProfile = async () => {
  try {
    const userInfo = await axios.get('http://localhost:3001/users/profile', {
      headers: {
        Authorization: localStorage.getItem('userId')
      }
    })

    profileInfo.innerText = `Welcome back, ${userInfo.data.user.email}!`

  } catch (error) {
    alert('profile not found')
  }
}
// form handlers

const handleSignUp = async () => {
  const email = signUpEmail.value;
  const password = signUpPassword.value;
  try {
    const response = await axios.post('http://localhost:3001/users', {
      email: email,
      password: password
      })
      const userId = response.data.newUser.id
      localStorage.setItem('userId', userId)
      displayLoggedIn();
  } catch (error) {
    console.log(error);
  }
}

const handleLogin = async () => {
  const email = loginEmail.value;
  const password = loginPassword.value;
  try {
    const response = await axios.post('http://localhost:3001/users/login', {
      email: email,
      password: password
    })
    console.log(response);
    const userId = response.data.user.id
     localStorage.setItem('userId', userId)
     displayLoggedIn()
  } catch (error) {
    console.log(error);
  }
  
}

if(localStorage.getItem('userId')){
  displayLoggedIn()
}else{
  displayLoggedOut()
}




//EVENT LISTENERS

//form listeners
signUpForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  handleSignUp();
})

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  handleLogin();
})


// link listeners
homeLink.addEventListener('click', () => {
  hideAllSections();
  homeSection.classList.remove('hidden');
})

signUpLink.addEventListener('click', () => {
  hideAllSections();
  signUpSection.classList.remove('hidden');
})

loginLink.addEventListener('click', () => {
  hideAllSections();
  loginSection.classList.remove('hidden');
})

logOutLink.addEventListener('click', () => {
  hideAllSections();
  displayLoggedOut();
  localStorage.removeItem('userId');
})

profileLink.addEventListener('click', () => {
  hideAllSections();
  profileSection.classList.remove('hidden');
  getProfile()
})