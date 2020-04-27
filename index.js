'use strict';

const API_key = "rvBOo36IQaVxFFaewQM48yiSC9LYJGAj6eFyBZE8";

function getInputs() {
  let inputs = {
    firstState: $(".js-dropdown-1").val(),
    secondState: $(".js-dropdown-2").val(),
    thirdState: $(".js-dropdown-3").val(),
    numResults: $(".js-textInput").val()
  }
  getResponse(inputs);
}

function getResponse(inputs) {
  let url = `https://developer.nps.gov/api/v1/parks?stateCode=${inputs.thirdState}&stateCode=${inputs.secondState}&stateCode=${inputs.firstState}&limit=${inputs.numResults}&start=1&api_key=rvBOo36IQaVxFFaewQM48yiSC9LYJGAj6eFyBZE8`;

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
  $(".js-form").on("click", $(".submit"), function (e) {
    e.preventDefault();
    getInputs();
  });
}

$(watch);