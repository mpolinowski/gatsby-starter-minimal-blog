const btn = document.querySelector("button")
const output = document.querySelector("#output")
const intake = document.querySelector("input")

const baseUrl = "https://randomuser.me/api/"

btn.addEventListener("click", getInput)


function getInput() {
  let params = new Request(baseUrl, {
    method: "GET",
    mode: "cors",
    headers: new Headers(),
    cache: "default"
  })
  fetch(params).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  })
}


function getInput1() {
  fetch(baseUrl).then(function (response) {
    return response.text();
  }).then(function (data) {
    console.log(data);
  })
}


function getInput2() {
  let url = "photo-34475542491_9069464269_o-cover.jpg";
  fetch(url).then(function (response) {
    return response.blob();
  }).then(function (data) {
    let pathImage = URL.createObjectURL(data);
    document.querySelector("img").src = pathImage;
  })
}
