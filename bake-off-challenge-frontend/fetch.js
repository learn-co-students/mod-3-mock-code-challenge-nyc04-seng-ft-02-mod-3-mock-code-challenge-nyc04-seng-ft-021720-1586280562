const BASE_URL = 'http://localhost:3000/bakes'

function bakeFetcher(){
   return  fetch(BASE_URL)
    .then(response=>response.json())
}

function bakeAdderFetch(bakeObject){
    return fetch(BASE_URL,{
    method: "POST",
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bakeObject)
    })
    .then(response=>{
        if(response.ok){
            return response.json()
        }
    })
}

function bakeRater(bakeID,valueRate){

    return fetch(BASE_URL+`/${bakeID}`+"/ratings",{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261"
        },
        body: JSON.stringify({
            score: valueRate
        })        
    })
    .then(response=> {
        if(response.ok){
            return response.json()
        }
    })

}

