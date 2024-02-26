const COHORT = "2308-acc-et-web-pt-b";
const endPoint = "/events";
const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/${endPoint}`;

const state = {
  parties: [],
};

//references
const partyList = document.querySelector("#parties");
const addPartyForm = document.querySelector("#addParty");

//event listener for adding parties
addPartyForm.addEventListener("submit", addParty);

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
    Description: ${partyDescription} <br>
    Date: ${partyDate} <br>
    Location: ${partyLocation}
    `;
    return li;
  });

  partyList.replaceChildren(...partyListing);
}
