const COHORT = "2308-acc-et-web-pt-b";
const endPoint = "/events";
const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}${endPoint}`;

const state = {
  parties: [],
};

//references
const partyList = document.querySelector("#parties");
const addPartyForm = document.querySelector("#addParty");
const deletePartyButton = document.querySelector("#deleteParty");

//event listener for adding parties
addPartyForm.addEventListener("submit", addParty);

//event listener for deleting parties
//deletePartyButton.addEventListener("click", deleteParty);

//function that synchronizes state and displays all events including user's added events
async function displayAllParties(){
  await getAPIParties();
  getParties();
}
displayAllParties();

//synchronizes state with API parties
async function getAPIParties(){
  try{
    const response = await fetch(API);
    const data = await response.json();
    state.parties = data.data;
  } catch (error) {
    console.error(error);
  }
}

//render parties from state as it changes

function getParties () {
  if (!state.parties.length){
    partyList.innerHTML = "<li>No parties planned.</li>";
  return;
  }

  const partyListing = state.parties.map((party) => {

    const li = document.createElement("li");
    const partyName = party.name;
    const partyDescription = party.description;
    const partyDate = party.date;
    const partyLocation = party.location;
    li.innerHTML = `
    <h2>${partyName}</h2>
    <p class="attribute">Description: </p> ${partyDescription} <br>
    <p class ="attribute"> Date: </p> ${partyDate} <br>
    <p class = "attribute"> Location: </p> ${partyLocation}
    <p><button id="deleteParty">Delete</button></p>`;
    return li;
  });
  //refresh list
  partyList.replaceChildren(...partyListing);
}

//add party to api
async function addParty(event){
  event.preventDefault();

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({
        name: addPartyForm.name.value,
        Date: addPartyForm.date.value,
        description: addPartyForm.description.value,
      }),
    });

    if(!response.ok) {
      throw new Error("Cannot create party, try again.");
    }

    displayAllParties();
  } catch (error) {
    console.error(error);   
  }
}