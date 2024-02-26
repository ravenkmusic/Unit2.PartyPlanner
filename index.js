const COHORT = "2308-acc-et-web-pt-b";
const endPoint = "/events";
const API = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/${endPoint}`;

const state = {
  events: [],
  event: null,
  guests: [],
  rsvps: [],
};