//=============== DOCUMENT QUERIES ===============//
// nav links
const nav_HomeLink = document.querySelector('#home-link');
const nav_SignupLink = document.querySelector('#signup-link');
const nav_LoginLink = document.querySelector('#login-link');
const nav_LogoutLink = document.querySelector('#logout-link');
const nav_ProfileLink = document.querySelector('#profile-link');
// sections
const sec_Home = document.querySelector('#home-content');
const sec_Signup = document.querySelector('#signup-content');
const sec_Login = document.querySelector('#login-content');
const sec_Profile = document.querySelector('#profile-content');


//=============== NAV LINKS ===============//
// home page
nav_HomeLink.addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  sec_Home.classList.remove('hidden')
})
// signup form
nav_SignupLink.addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  sec_Signup.classList.remove('hidden')
})
// login form
nav_LoginLink.addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  sec_Login.classList.remove('hidden')
})
// logout
nav_LogoutLink.addEventListener('click', () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  // return to home page
  sec_Home.classList.remove('hidden')
  // remove id from local storage
  localStorage.removeItem('userId');
  // display proper links
  checkForUser();
})
// display profile
nav_ProfileLink.addEventListener('click', async () => {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
  sec_Profile.classList.remove('hidden')
  // check for valid user and display info if valid
  try {
    // get user id
    const userId = await localStorage.getItem('userId');
    console.log(userId);
    // get profile
    const res = await axios.get('http://localhost:3001/users/profile', {
      params: {
        id: userId
      }
    })
    // display profile
    document.querySelector('#profile-info').innerHTML = `User: email: ${res.data.user.email}, password: ${res.data.user.password}`;
    
  } catch (error) {
    alert('invalid user');
  }
})


//=============== FORM SUBMISSIONS ===============//
// sign-up
document.querySelector('#signup-form').addEventListener('submit', async (event) => 
{
  event.preventDefault();
  // get email
  const email = document.querySelector('#signup-email').value;
  // get pw
  const password = document.querySelector('#signup-password').value;
  
  try {
    // make user
    const res = await axios.post('http://localhost:3001/users', {
      email: email,
      password: password
    })
    // return user response
    console.log(res);
    // grab user id
    const userId = res.data.user.id;
    // add to local storage - login user
    localStorage.setItem('userId', userId);
    // display proper nav links
    checkForUser();
    
  } catch (error) {
    alert('email is already taken');
  }
})

// login
document.querySelector('#login-form').addEventListener('submit', async (event) => 
{
  event.preventDefault();
  // get email, pw
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;
  
  try {
    // login user
    const res = await axios.post('http://localhost:3001/users/login', {
      email: email,
      password: password
    })
    // grab user id
    const userId = res.data.user.id;
    // login message
    console.log(`login successfull with ID: ${userId}`);
    // add id to local storage - login user with id
    localStorage.setItem('userId', userId);
    // check for logged in user
    checkForUser();

    // clear sections
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'))
    // return to home page
    sec_Home.classList.remove('hidden')

  } catch (error) {
    alert('login failed');
  }
})


//=============== FUNCTIONS ===============//
// displays appropriate nav links when user is logged in or out
async function checkForUser ()
{
  // check for logged in user on page load
  if (localStorage.getItem('userId'))
  {
    // hide sign-up and login links
    nav_SignupLink.classList.add('hidden');
    nav_LoginLink.classList.add('hidden');
    // reveal logout and profile links
    nav_LogoutLink.classList.remove('hidden');
    nav_ProfileLink.classList.remove('hidden');
  }
  // no user logged in
  else
  {
    // hide logout and profile links
    nav_LogoutLink.classList.add('hidden');
    nav_ProfileLink.classList.add('hidden');
    // reveal sign-up and login links
    nav_SignupLink.classList.remove('hidden');
    nav_LoginLink.classList.remove('hidden');
  }
}
// call on page load
checkForUser();