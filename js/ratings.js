import { dbRef } from "../config/firebase"
import { onValue } from "firebase/database"

const resultsContainer = document.getElementById('results-grid')


window.onload = () => {

  onValue(dbRef, (snapshot) => {
    let ratings = []
    snapshot.forEach(child => {
      const data = child.val()
      ratings.push(data)
      // displayRatings(data)
    })

    ratings.sort((a, b) => a.hits - b.hits)
    ratings.forEach(rating => displayRatings(rating))
  })
}

function displayRatings(data) {

  const html = `
    <div class="grid-item">
      <div>${data.name}</div>
      <div>${data.duration}</div>
      <div>${data.result}</div>
      <div>${data.hits}</div>
    </div>
  `
  resultsContainer.innerHTML += html;
}