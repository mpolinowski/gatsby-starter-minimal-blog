const btn = document.querySelector("button")
const output = document.querySelector("#output")
const intake = document.querySelector("input")

const url = "https://randomuser.me/api/"

btn.addEventListener("click", getInput)


function getInput() {
  const xhr = new XMLHttpRequest()
  let tempVal = intake.value
  let tempURL = url + "?results=" +tempVal
  xhr.onload = function () {
    if(xhr.readyState === 4 && xhr.status == "200") {
      let data = JSON.parse(xhr.responseText).results
      outputHTML(data)
    } else {
      console.log("error")
    }
  }
  xhr.open("GET", tempURL)
  xhr.send()
}

function outputHTML(data) {
  console.log(data)
  for(let i=0; i<data.length; i++) {
    output.innerHTML += "<br>" + data[i].email + "<br>"
  }
}