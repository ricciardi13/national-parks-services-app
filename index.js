'use strict';

const API_key = "rvBOo36IQaVxFFaewQM48yiSC9LYJGAj6eFyBZE8";

function getInputs() {
  let entryString = $(".stateEntry").val().toLowerCase().split(",");
  for (let i = 0; i < entryString.length; i++){
    entryString[i] = entryString[i].trim();
  }
  entryString = entryString.toString();
  console.log(entryString);
  let results = $(".numEntry").val();
  getResponse(entryString, results);
}

function getResponse(entryString, results) {
  let url = `https://developer.nps.gov/api/v1/parks?stateCode=${entryString}&limit=${results}&api_key=rvBOo36IQaVxFFaewQM48yiSC9LYJGAj6eFyBZE8`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-msg').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  $(".js-results").empty();
  for (let i = 0; i < responseJson.limit; i++) {
    $(".js-results").append(
      `<section class="result">
                <h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description} <a href="${responseJson.data[i].url} target="_blank"">Learn More.</a></p>
            </section>`);
  }
}

function watch() {
  $(".js-form").submit(function(e) {
    e.preventDefault();
    getInputs();
  });
}

$(watch);