const API_key = "rvBOo36IQaVxFFaewQM48yiSC9LYJGAj6eFyBZE8";

function getInputs(){
    console.log("clicked");
    let inputs = {
        firstState: $(".js-dropdown-1").val(),
        secondState: $(".js-dropdown-2").val(),
        thirdState: $(".js-dropdown-3").val(),
        numResults: $(".js-textInput").val()
    }
    console.log(inputs);
    getResponse(inputs); 
}

function getResponse(inputs){
    let url = `https://developer.nps.gov/api/v1/parks?stateCode=${inputs.firstState}&stateCode=${inputs.secondState}&stateCode=${inputs.thirdState}&limit=${inputs.numResults}&start=1&api_key=rvBOo36IQaVxFFaewQM48yiSC9LYJGAj6eFyBZE8`;
    console.log(url);

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

function displayResults(responseJson){
    console.log(responseJson);
    $(".js-results").empty();
    console.log(responseJson.data[0].fullName);
    for (let i = 0; i < responseJson.limit; i++){
        console.log("hello " + i);
          $(".js-results").append(
            `<section class="result">
                <h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description} <a href="${responseJson.data[i].url}">Learn More.</a></p>
            </section>`);  
    } 
    console.log("display complete");
    
}

function watch(){
    console.log("loaded");
    $(".js-form").on("click", $(".submit"), function(e){
        e.preventDefault();
        getInputs();
    });
}

$(watch);