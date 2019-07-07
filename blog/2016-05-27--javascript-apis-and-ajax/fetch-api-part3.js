const btn = document.querySelector("button")
const output = document.querySelector("#output")
const intake = document.querySelector("input")

const baseUrl = "https://randomuser.me/api/"

btn.addEventListener("click", getInput)


function getInput() {
  let userNumber = intake.value;
  let url = baseUrl + "?results=" + userNumber;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      outputHTML(data);
    })
}

function outputHTML(data) {
  console.log(data.results)
  for (let i = 0; i < data.results.length; i++) {
    output.innerHTML += "<br>" + data.results[i].name.last + ", " + data.results[i].name.first + "<br>"
  }
}
