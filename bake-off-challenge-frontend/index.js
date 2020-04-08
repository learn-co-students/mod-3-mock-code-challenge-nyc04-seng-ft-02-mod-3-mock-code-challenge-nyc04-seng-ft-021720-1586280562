// your code here!
console.log("🥧")
//selectors
let bakesContainer = document.getElementById("bakes-container")
let bakesDetailContainer = document.getElementById("detail")
let newBakeContainer = document.getElementById("submitButton")
let inputFormName = document.querySelector('[name="name"]')
let inputFormImage = document.querySelector('[name="image_url"]')
let inputFormDescription = document.querySelector('[name="description"]')
// get the bake data
fetch('http://localhost:3000/bakes')
.then(response => response.json())
.then(output => {
output.forEach(bake => {
addBakes(bake)
})
})
// add the bake data to the sidebar / details page
//add bake detail page
// functions
function addBakes(bake){
    let tempBake = document.createElement('li')
    //tempBake.id = `${bake.id}`
    tempBake.textContent = `${bake.name}`
    tempBake.className = "item"
    tempBake.id = bake.id
    tempBake.innerHTML = `${bake.name}`
    tempBake.addEventListener("click", e=>{
    addBakesDetails(bake)
    })
    if (tempBake.id == 1 ){
        addBakesDetails(bake)
    }
    bakesContainer.append(tempBake)
    }

    function addBakesDetails(bake){
        let tempBakeDetails = document.createElement('div')
        tempBakeDetails.className = "description"
        tempBakeDetails.innerHTML = `
         <img src="${bake.image_url}"/>
         <h1>${bake.name}</h1>
         <p> ${bake.description}</p>
         <form id="score-form" data-id="${bake.id}">
         <input value="10" type="number" name="score" min="0" max="10" step="1">
            <input type="submit" value="Rate">
          </form>
        `
        let childOfDetail = bakesDetailContainer.firstChild
        bakesDetailContainer.replaceChild(tempBakeDetails,childOfDetail)
        //bakesDetailContainer.removeChild(bakesDetailContainer.firstChild)
        //bakesDetailContainer.append(tempBakeDetails)
        }

function addNewBake(name,image,description){
    console.log( "AAAAAA")
    fetch('http://localhost:3000/bakes',{
        method: 'POST',
        headers: {
            'Content-Type' :'application/json',
        },
        body: JSON.stringify({
            "name" :name,
           "image_url" :image,
            "description" : description
        })
})
.then((response) => response.json())
.then((form) =>{
    console.log(form)
addBakes(form)

})
}
//event listner for submit
newBakeContainer.addEventListener("click", e=>{
    e.preventDefault()
    console.log( "CLICKED")
    console.log( inputFormImage.value)
    addNewBake(inputFormName.value,inputFormImage.value,inputFormDescription.value)
})
