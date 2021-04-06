# Intro to Auth
- difference between authorization and authentication
  - can't have authorization w/o authentication, but can do vice versa
  - we are doing authentication
- this is a frontend & backend app

## Touring the starter code
- there is an express app serving up the frontend
- 3001 vs 3000
- main.js; maybe move links stuff into links.js?
- users migration & model

## Setup
- npm i in both repos
- sequelize db:create/migrate in backend
- 2 terminal tabs for front & back, run both servers

## Chapter 1: Creating a user (aka signup)
### Backend
  - set up POST /users route
  - email uniqueness
  - respond w/ user obj
### Frontend
  - axios
  - post on form submission
  - if error, alert it
  - if success, save user id to localStorage
  - good time for morgan

## Chapter 2: Logging in
### Backend
  - POST /users/login
  - look up user by email
  - check if passwords match
  - if so, respond w/ user obj
  - otherwise, 401
### Frontend
  - same as signup form, just make sure you use login inputs values

## Chapter 3: Logging out
### Backend
  - not a dang thing: the backend has no persisted memory of whether someone is logged in or not
### Frontend
  - clear localstorage
  - show home page

## Chapter 4: Detecting the logged in state
### Backend
  - (optional) GET /users/verify endpoint
### Frontend
  - on page load, check local storage
  - if present, show logged in state, else show logged out
  - (optional) hit the /users/verify endpoint

## Chapter 5: Using a protected route
### Backend
  - GET /users/profile
  - look that user up
  - if present, show profile
  - if absent, 401
### Frontend
  - send userId in payload

## You now have a functioning users app; everything below this is stretch

## Chapter 6: Encrypting the userId
### Backend
  - before userId goes out the door, use jsonwebtoken.sign({userId: id}, secret)
  - secret must be put in .env
  - when looking up user, jsonwebtoken.verify({userId: id}, secret)
### Frontend
  - the userId you get back will now be signed, just save it to localstorage

## Chapter 7: Hashing db passwords
### Backend
  - before creating user, bcrypt.hashSync(req.body.password, 10)
  - when logging in, instead of direct password comparison, bcrypt.compareSync(req.body.password, user.password)
### Frontend
  - not a dang thing

## Chapter 8: User on every request
### Frontend
  - include userId in headers of every request, either with axios default or request function
### Backend
  - install middleware that looks up user before every request and puts it (or null) into req.user