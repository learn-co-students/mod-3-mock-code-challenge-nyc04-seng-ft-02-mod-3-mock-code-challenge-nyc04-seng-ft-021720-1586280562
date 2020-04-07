// your code here!
let bakesContainer = document.querySelector('#bakes-container')
let bakeShow = document.querySelector('#detail')
let bakeForm = document.querySelector('#new-bake-form')
let scoreForm = document.querySelector('#detail')
let judgeBake = document.querySelector('#judge-bake-button')

function bakeAdder(bake){
    bakeLI = document.createElement('li')
    bakeLI.dataset.id = bake.id
    bakeLI.className = "item"
    bakeLI.innerHTML = `${bake.name}`
    bakesContainer.append(bakeLI)
}

bakeFetcher()
.then(bake => {
    bake.forEach(bake=>bakeAdder(bake))
    bakeShowAdd(bake[0])

})

function bakeShowAdd(bake){
    bakeShow.innerHTML = `<img src="${bake.image_url}">
    <h1>${bake.name}</h1>
    <p class="description">
        ${bake.description}
    </p>
    <form id="score-form" data-id="${bake.id}">
      <input value="${bake.score}" type="number" name="score" min="0" max="10" step="1">
      <input type="submit" value="Rate">
    </form>`
}

bakesContainer.addEventListener('click', e=>{
    if(e.target.matches('.item')){
        let bakeID = parseInt(e.target.dataset.id)
        bakeID -- 
        bakeFetcher()
        .then(bake => bakeShowAdd(bake[bakeID]))
    }
})

bakeForm.addEventListener('submit', e=>{
    e.preventDefault()
    let name = bakeForm.querySelector('[name="name"]').value
    let image_url = bakeForm.querySelector('[name="image_url"]').value
    let description = bakeForm.querySelector('[name="description"]').value

    let bakeObject = {
        name,
        image_url,
        description
    }

    bakeAdderFetch(bakeObject)
    .then(bake => bakeAdder(bake))

})


scoreForm.addEventListener('submit', e=>{
    e.preventDefault()
    let bakeFound = parseInt(e.target.closest('#score-form').dataset.id)
    let valueRate = scoreForm.querySelector('[name="score"]').value
    bakeRater(bakeFound,valueRate)
    .then(bake=> {
        scoreForm.querySelector('[name="score"]').value = bake.score
    })
})


judgeBake.addEventListener('click', e=>{
    bakeFetcher()
    .then(bakes => {
     let bakes_sorted = (bakes.sort((bake1, bake2) => bake2.score - bake1.score))
     let winner = bakes_sorted[0].id
     let winnerSet = document.querySelector(`[data-id="${winner}"]`)
     winnerSet.classList.add('winner')
    })
    
})





console.log("🥧")