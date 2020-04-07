// your code here!
console.log("🥧")

fetch("http://localhost:3000/bakes") 
    .then(r => r.json())
    .then(bakeData => {
        console.log(bakeData)
        bakeData.forEach(function (bake) {
            renderBake(bake)
        })
    })

const BC = document.querySelector("#bakes-container")
function renderBake(bakeObj){
    const sideLi = document.createElement("li")
    sideLi.className = "item"
    sideLi.dataset.id = bakeObj.id
    sideLi.innerHTML = `
        <p>${bakeObj.name}</p>
`

sideLi.addEventListener("click", e => {
    renderBakeDetail(bakeObj)
  })

BC.append(sideLi)

}

function renderBakeDetail(bakeObj) {
    const detailDiv = document.querySelector("#detail")
    detailDiv.innerHTML = `
      <img src="${bakeObj.image_url}" alt="${bakeObj.name}">
      <h1>${bakeObj.name}</h1>
      <p class="description">
      ${bakeObj.description}
      </p>
      <form id="score-form" data-id="${bakeObj.id}">
        <input value="${bakeObj.score}" type="number" name="score" min="0" max="10" step="1">
        <input type="submit" value="Rate">
      </form>
    `

}
  
function createBake(newBake) {
    return fetch('http://localhost:3000/bakes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBake),
    })
      .then(r => r.json())
  }

  document.querySelector("#new-bake-form").addEventListener("submit", e => {
    e.preventDefault()
  
    const newBake = {
      name: e.target.name.value,
      image_url: e.target.image_url.value,
      description: e.target.description.value
    }
  
    createBake(newBake)
      .then(actualNewBake => renderBake(actualNewBake))
  
  })
       




