// your code here!
console.log("hi, cutie-🥧");

// I removed the 'defer' from the html, so that we can make those decisions
// inside this file instead, enabling us to allow functions to be defined while
// the DOM is still loading.

const BAKE_ENDPOINT = 'http://localhost:3000/bakes/'

document.addEventListener('DOMContentLoaded', function(){

	// grab some elements from the document
	bakesContainer = document.querySelector('#bakes-container');

	// get the existing bakes from the server and add them to the page
	fetch(BAKE_ENDPOINT)
		.then(response => response.json())
		.then(bakes => addMultipleBakesToPage(bakes));

});

function addMultipleBakesToPage(bakes){
	bakes.forEach(bake => addBakeToPage(bake));
}

function addBakeToPage(bake){
	const bakeElement = document.createElement('li');
	bakeElement.classList.add('item');
	bakeElement.dataset.id = bake.id;
	bakeElement.append(bake.name)
	bakesContainer.append(bakeElement);
}
