const COHORT = "2308-acc-et-web-pt-b";
const endPoint = "/events";
const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/${endPoint}`;

const state = {
  events: [],
};

//references

const eventList = document.querySelector("#events");
const addPartyForm = document.querySelector("#addParty");

//event listener for adding parties
addPartyForm.addEventListener("submit", addParty);