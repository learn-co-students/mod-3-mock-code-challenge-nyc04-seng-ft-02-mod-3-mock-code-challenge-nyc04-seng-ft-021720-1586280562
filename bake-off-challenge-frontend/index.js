// your code here!
const BASE_URL = "http://localhost:3000/" 
const bakesContainer = document.querySelector('#bakes-container')
const bakeDisplay = document.querySelector('#detail')
const newBakeForm = document.querySelector('#new-bake-form')
const judgeBakeButton = document.querySelector('#judge-bake-button')

fetch(BASE_URL + '/bakes')
.then((response) => {
    return response.json();
})
.then((bakeArr) => {
    bakeArr.forEach(renderBake);
    displayBake(bakeArr[0])
});

function renderBake(bakeObj){
    const bakeLi = document.createElement('li')
    bakeLi.dataset.id = bakeObj.id
    bakeLi.innerText = bakeObj.name
    
    bakeLi.addEventListener("click", function(e){
        displayBake(bakeObj)
    })
    
    bakesContainer.append(bakeLi)
}

function displayBake(bakeObj){
    bakeDisplay.innerHTML = ""
    bakeDisplay.innerHTML = `
    <img src=${bakeObj.image_url} alt=${bakeObj.name}>
    <h1>${bakeObj.name}</h1>
    <p class="description">
    ${bakeObj.description}
    </p>
    <form id="score-form" data-id=${bakeObj.id}>
    <input value="10" type="number" name="score" min="0" max="10" step="1">
    <input type="submit" value="Rate">
    </form>
    `
    const scoreForm = document.querySelector('#score-form')
    
    scoreForm.addEventListener("submit", function(e){
        e.preventDefault();
        score = scoreForm.score.value
        
        fetch(BASE_URL + `/bakes/${bakeObj.id}/ratings`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261"
        },
        body: JSON.stringify({
            score
        }),
    })
        .then((response) => response.json())
    })
}

function createNewBake(bakeObj){

}
  
newBakeForm.addEventListener("submit", function(e){
    e.preventDefault();
    name = newBakeForm.name.value
    image_url = newBakeForm.image_url.value
    description = newBakeForm.description.value
    

    fetch(BASE_URL + "/bakes", {
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name,
        image_url,
        description
  }),
})
.then((response) => response.json())
.then((bakeObj) => {
  renderBake(bakeObj);
})
})

judgeBakeButton.addEventListener("click", function(e){
    e.preventDefault

    fetch(BASE_URL + '/bakes')
    .then((response) => {
    return response.json();
    })
    .then((bakeArr) => {
    bakeArr.forEach(highestScore)
    console.log(bakeScores)
    return Math.max(bakeScores)
});

})

function highestScore(bake){
    bakeScores = [];
    bakeScores.push(bake.score)
}