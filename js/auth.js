import { handleResetPsw, handleSignin, handleSignup } from "../config/firebase.js"

const signupForm = document.getElementById('signup-form')
const signinForm = document.getElementById('signin-form')
const resetForm = document.getElementById('reset-form')
const email = document.getElementById('email-input')
const password = document.getElementById('password-input')
const formHeading = document.getElementById('form-heading')

if(signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      await handleSignup(email.value, password.value)
      window.location.pathname = '/'
    } catch (error) {
      if (error.code === "auth/user-not-found") formHeading.innerText = ("მომხმარებელი არ არსებობს");
      else if (error.code === "auth/email-already-in-use") formHeading.innerText = ("მეილი დაკავებულია");
      else formHeading.innerText = ("შეცდომაა, სცადეთ თავიდან");
    }
  })
} else if(signinForm){
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      await handleSignin(email.value, password.value)
      window.location.pathname = '/'
    } catch (error) {
      if (error.code === "auth/user-not-found") formHeading.innerText = ("მომხმარებელი არ არსებობს");
      else if (error.code === "auth/wrong-password")
        formHeading.innerText = ("შეიყვანეთ სწორი პაროლი");
      else formHeading.innerText = ("შეცდომაა, სცადეთ თავიდან");
    }
  })
} else if(resetForm) {
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      await handleResetPsw(email.value)
    } catch (error) {
      if (error.code === "auth/user-not-found") formHeading.innerText = ("მომხმარებელი არ არსებობს");
      else formHeading.innerText = ("შეცდომაა, სცადეთ თავიდან");
    }
  })
}