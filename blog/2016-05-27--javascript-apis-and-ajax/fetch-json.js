const btn = document.querySelector("button")
const output = document.querySelector("#output")
const intake = document.querySelector("input")

const url = "https://api.myjson.com/bins/10zkba"

btn.addEventListener("click", getInput)


function getInput() {
  fetch(url).then(res => res.json())
    .then(function (data) {
      for (let i = 0; i < data.results.length; i++) {
        console.log(data.results[i].name.last + ", " + data.results[i].name.first)
      }
    })
    .catch(error => console.log(error))
}