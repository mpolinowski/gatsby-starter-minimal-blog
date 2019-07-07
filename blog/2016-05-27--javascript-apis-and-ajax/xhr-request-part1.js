const btn = document.querySelector("button")
const output = document.querySelector("#output")

btn.addEventListener("click", getJoke)

function getJoke() {
  const xhr = new XMLHttpRequest()
  const url = 'https://api.chucknorris.io/jokes/random'

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const obj = JSON.parse(xhr.responseText)
        output.innerHTML = obj.value + '<br/><br/><img src="' + obj.icon_url + '"><br/><br/>'
      } else {
        output.innerHTML = "ERROR"
      }
    }
  }
  xhr.open('GET', url)
  xhr.send()

  xhr.addEventListener("progress", callBackfn)
  xhr.addEventListener("load", callBackfn)
  xhr.addEventListener("error", callBackfn)
}

function callBackfn(e) {
    console.log(e)
}