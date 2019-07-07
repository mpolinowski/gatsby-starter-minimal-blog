const btn = document.querySelector("button")
const output = document.querySelector("#output")
const intake = document.querySelector("input")

// const url = "http://jsonplaceholder.typicode.com/photos"
const url = "https://swapi.co/api/planets"

btn.addEventListener("click", getInput)


function getInput() {
  fetch(url).then(res => res.json())
    .then(function (data) {
      console.log(data.results[8].name)
    })
    .catch(error => console.log(error))
}


function getInput1() {
  fetch(url).then(res => res.json())
    .then(function (data) {
      console.log(data[0].thumbnailUrl)
      document.querySelector("img").src = data[0].thumbnailUrl;
    })
    .catch(error => console.log(error))
}
