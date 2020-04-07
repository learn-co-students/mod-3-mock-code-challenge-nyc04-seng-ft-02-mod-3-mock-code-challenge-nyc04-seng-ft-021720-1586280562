// I removed the 'defer' from the html, so that we can make those decisions
// inside this file instead, enabling us to allow functions to be defined while
// the DOM is still loading.

const BAKE_ENDPOINT = 'http://localhost:3000/bakes/'

document.addEventListener('DOMContentLoaded', function(){

	// grab some elements from the document
	bakesContainer = document.querySelector('#bakes-container');
	bakeDetailContainer = document.querySelector('#detail');
	newBakeForm = document.querySelector('#new-bake-form');

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

	// create new bake
	newBakeForm.addEventListener('submit', event => {
		event.preventDefault();
		createNewBakeFromForm();
	});

	// judge the bakes
	document.querySelector('#judge-bake-button').addEventListener('click', event => {
		fetch(BAKE_ENDPOINT + 'winner')
			.then(response => response.json())
			.then(bake => {
				if (bake.id){
					bakesContainer.querySelector(`[data-id="${bake.id}"]`).classList.add('winner');
				} else {
					console.log('Error getting winning bake: ', bake);
				}
			});
	});

});

function scoreBake(scoreForm){
	// grab the data from the form
	scoreFormData = {
		score: scoreForm.score.value
	}
	
	// patch the bake
	fetch(BAKE_ENDPOINT + scoreForm.dataset.id + '/ratings', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261"
		},
		body: JSON.stringify(scoreFormData)
	})
		.then(response => response.json())
		.then(bake => {
			if (bake.id) {
				scoreForm.score.value = bake.score;
				console.log('Score for ', bake.id, ' is now ', bake.score);
			} else {
				console.log('Error updating bake: ', bake);
			}
		});
}

function createNewBakeFromForm(){
	// grab the data from the form
	const newBakeData = {
		name: newBakeForm.name.value,
		image_url: newBakeForm.image_url.value,
		description: newBakeForm.description.value
	};

	// create the bake
	createNewBake(newBakeData);

	// clear the form
	newBakeForm.reset();

	// close the modal
	closeModal();
}

function createNewBake(bake){
	fetch(BAKE_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bake)
	})
		.then(response => response.json())
		.then(bake => {
			if (bake.id){
				addBakeToPage(bake);
			} else {
				console.log('Error creating bake: ', bake);
			}
		});
}

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

	// submit handler for score form
	scoreForm.addEventListener('submit', event => {
		event.preventDefault();
		scoreBake(event.target);
	});

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
