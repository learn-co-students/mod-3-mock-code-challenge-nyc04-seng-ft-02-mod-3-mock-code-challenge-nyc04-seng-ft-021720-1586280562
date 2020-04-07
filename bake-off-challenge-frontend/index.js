// your code here!
console.log("hi, cutie-🥧");

// I removed the 'defer' from the html, so that we can make those decisions
// inside this file instead, enabling us to allow functions to be defined while
// the DOM is still loading.

const BAKE_ENDPOINT = 'http://localhost:3000/bakes/'

document.addEventListener('DOMContentLoaded', function(){

	// grab some elements from the document
	bakesContainer = document.querySelector('#bakes-container');
	bakeDetailContainer = document.querySelector('#detail');

	// get the existing bakes from the server and add them to the page
	fetch(BAKE_ENDPOINT)
		.then(response => response.json())
		.then(bakes => addMultipleBakesToPage(bakes));

	// load bake details when clicking on the item in the sidebar
	bakesContainer.addEventListener('click', event => {
		if (event.target.className === 'item'){
			fetch(BAKE_ENDPOINT + event.target.dataset.id)
				.then(response => response.json())
				.then(bake => updateBakeDetailView(bake));
		}
	});

});

function updateBakeDetailView(bake){
	// image
	const image = document.createElement('img');
	image.src = bake.image_url;
	image.alt = bake.name;

	// name
	const name = document.createElement('h1');
	name.append(bake.name);

	// description
	const description = document.createElement('p');
	description.classList.add('description');
	description.append(bake.description);

	// score form
	const scoreForm = document.createElement('form');
	scoreForm.id = 'score-form';
	scoreForm.dataset.id = bake.id;
	const scoreInput = document.createElement('input');
	scoreInput.value = bake.score;
	scoreInput.type = 'number';
	scoreInput.name = 'score';
	scoreInput.min = 0;
	scoreInput.max = 10;
	scoreInput.step = 1;
	const scoreSubmit = document.createElement('input');
	scoreSubmit.type = 'submit';
	scoreSubmit.value = 'Rate';
	scoreForm.append(scoreInput, scoreSubmit);

	// package the elements into an array
	const bakeDetailViewElements = [image, name, description, scoreForm];

	// update the detail view
	replaceContentsOf(bakeDetailContainer, bakeDetailViewElements);
}

function replaceContentsOf(element, arrayOfNewContent){
	while(element.firstChild){
		element.removeChild(element.firstChild);
	}
	element.append(...arrayOfNewContent);
}

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
