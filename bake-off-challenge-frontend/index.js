// your code here!
console.log("🥧")
const BASE_URL = 'http://localhost:3000'

let allBakes;
fetch(BASE_URL + '/bakes')
.then(response => response.json())
.then(bakes => {
  allBakes = bakes
  bakes.forEach(bake => {
    renderBakeList(bake)
  })
})

const bakeList = document.querySelector('#bakes-container')
const bakeShow = document.querySelector('#detail')
const bakeCreate = document.querySelector('#new-bake-form')
const bakeDetail = document.querySelector('#detail')

function renderBakeList({name, id}) {
  const bakeLi = document.createElement('li')
  bakeLi.dataset.id = `${id}`
  bakeLi.innerHTML = `<h2 class="bake-list-item">${name}</h2>`
  bakeList.append(bakeLi)
}

function renderBake({name, id, image_url, description, score}) {
  bakeShow.innerHTML = ""
  const bakeDiv = document.createElement('div')
  bakeDiv.dataset.id = `${id}`
  bakeDiv.setAttribute('class', `${name}`)
  bakeDiv.innerHTML = `
    <img src="${image_url}" class="bake-image">
    <h2>${name}</h2>
    <p>${description}</p>
    <input type="number" class="score-input" value="${score}"></input>
    <button type="submit" class="rate-button">Rate</button>
    <br>
    <button class="delete-button">Delete</button>
    `
  bakeShow.append(bakeDiv)
}

function deleteBake(bakeDiv) {
  fetch(BASE_URL + `/bakes/${bakeDiv.id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if(response.ok){
      bakeDiv.remove()
    }
  })
}

bakeList.addEventListener("click", event =>{
  if(event.target.className === 'bake-list-item'){
    const bakeId = parseInt(event.target.parentElement.dataset.id)
    let bake = allBakes.find(bake => bake.id === bakeId)
    renderBake(bake)
  }
})

bakeDetail.addEventListener("click", event => {
  const bakeDiv = event.target.closest('div')
  const bakeId = event.target.closest('div').dataset.id
  if(event.target.className === "delete-button"){
    const bakeContainer = event.target.closest('main').querySelector('#bakes-container')
    const bakeLi = bakeContainer.querySelector(`[data-id='${bakeId}']`)
    bakeLi.remove()
    deleteBake(bakeDiv)
    }
    else if(event.target.className === "rate-button"){

    }
  })

bakeCreate.addEventListener('submit', event=> {
  event.preventDefault()
  const bake = {
    name: event.target.name.value,
    image_url: event.target.image_url.value,
    description: event.target.description.value
  }

  fetch(BASE_URL + '/bakes', {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bake),
    })
    .then(response => response.json())
    .then(bake => renderBakeList(bake))

  event.target.reset()
})

    
