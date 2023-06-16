import { auth, handleSignout } from "./config/firebase"
const logout = document.getElementById('logout')

auth.onAuthStateChanged(user => {

  if(user) {
    const userNameContainer = document.getElementById('user-name')
    if(userNameContainer)
      userNameContainer.innerText = user.email.split('')[0]
    
    localStorage.setItem('user', JSON.stringify({
      id: user.uid,
      name: user.email.split("@")[0]
    }))
  }
  // else window.location.href = '/html/signin.html'
  else window.location.replace('/html/signin.html')
})

if(logout){
  logout.addEventListener('click', () => {
    handleSignout()
  })
}