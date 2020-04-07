// your code here!
// Focus on the first 3 deliverables first, then the next 2
console.log("🥧")

// D1: **When the page first loads**, 
// Set eventListener for page load
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  // Helpers //
  // all the bakes should display in the sidebar
  const url = "http://localhost:3000/bakes";
  const bakesCont = document.getElementById("bakes-container");
  const bakeDetail = document.getElementById("detail");
  renderBakeEntries();
  getFirstBake();

  //************** HELPER FUNCTIONS **********************//
  // append child to parent element
  function append(parent, el) {
    return parent.append(el);
  };
  // create elements
  function createNode(element) {
    return document.createElement(element);
  };


  //************** FORM HELPERS **********************//
  // function rateBake(bakeObj, form) {
  //   form.addEventListener("submit", function() {
  //     prevent de
  //   })
  // };

  //************** EVENT HELPERS **********************//
  // clicking on an entry on the left renders the details on the right
  function renderDetails(el, bakeObj) {
    el.addEventListener("click", function() {
      renderBakeInfo(bakeObj);
    });
  };

  // clears the details page and renders info for selected entry
  function renderBakeInfo(bakeObj) {
    bakeDetail.innerHTML = '';
    const bakeDetails = {
      name: `${bakeObj.name}`,
      description: `${bakeObj.description}`,
      image_url: `${bakeObj.image_url}`,
      score: `${bakeObj.score}`
    };
    img = createNode("img");
    img.src = bakeDetails.image_url;
    img.alt = bakeDetails.name;
    h1 = createNode("h1");
    h1.innerHTML = bakeDetails.name;
    p = createNode("p");
    p.className = 'description';
    p.innerHTML = bakeDetails.description;
    form = createNode("form");
    form.id = 'score-form';
    form.setAttribute('data-id', bakeObj.id);
    inputScore = createNode('input');
    inputScore.setAttribute('value', bakeObj.score);
    inputScore.setAttribute('type', 'number');
    inputScore.name = 'score';
    inputScore.setAttribute('min', '0');
    inputScore.setAttribute('max', '10');
    inputScore.setAttribute('step', '1');
    inputSubmit = createNode('input');
    inputSubmit.setAttribute('type', 'submit');
    inputSubmit.setAttribute('value', 'Rate');
    append(bakeDetail, img);
    append(bakeDetail, h1);
    append(bakeDetail, p);
    append(bakeDetail, form);
    append(form, inputScore);
    append(form, inputSubmit);
    // rateBake(bakeObj, form);
  };

  //************** FETCH FUNCTIONS **********************//
  // gets all entries renders each in the entries section
  function renderBakeEntries() {
    fetch(url)
    .then(response => response.json())
    .then(function(bakes) {
      return bakes.map(function(bake) {
        li = createNode('li');
        li.className = 'item';
        li.setAttribute('data-id', `${bake.id}`);
        li.innerHTML = `${bake.name}`;
        append(bakesCont, li);
        renderDetails(li, bake);
      })
    })
  };

  // renders the first element of the array into the details section
  function getFirstBake() {
    fetch(url)
    .then(response => response.json())
    .then(function(data) {
      renderBakeInfo(data[0])
    })
  };

});



// D1: The first bake should show in the detail view (see deliverable 2)

// D2: **When a bake is clicked in the sidebar**, the details for the bake should show up in the detail area

// D3: When the "Make New Bake" button is clicked, a popup (modal) will display a form (this part is already done for you)

// D3: **When this form is submitted**, a new bake should be created in the backend and added to the list of bakes displayed in the sidebar

// ***************************** BONUS DELIVERABLES ************************ //
// D4: **In the detail view, when a user enters a score and submits**, the score should be saved in the backend and persisted in the frontend

// D5: **When the user clicks 'Judge Bakes'**, the winner should be revealed in the sidebar

// D5: 