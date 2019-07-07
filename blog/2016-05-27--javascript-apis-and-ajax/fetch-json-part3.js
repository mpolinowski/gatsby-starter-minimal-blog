const output = document.querySelector("#output");
const url = "https://restcountries.eu/rest/v2/all";
let responseObject = {};
fetch(url).then(res => res.json())
  .then(function (data) {
    responseObject = data;
    buildSelect(data);
  })
  .catch(error => console.log(error));


function buildSelect(data) {
    let select = document.createElement('select');
    data.forEach(function (item, index) {
        let option = document.createElement('option');        
        option.value = index;
        option.textContent = item.name;
        select.appendChild(option);
    })
    select.addEventListener("change",outputData);
    document.querySelector('body').appendChild(select);
}


function outputData(e){
    let country = responseObject[e.target.value];
    console.log(country);
    output.innerHTML = '<h1>'+country.name+'</h1>';
    output.innerHTML += '<p><strong>Native Name</strong>: '+country.nativeName+'</p>';
    output.innerHTML += '<p><strong>Population</strong>: '+country.population+'</p>';
    document.querySelector('img').src = country.flag;
    output.innerHTML += '<p><strong>Capital</strong>: '+country.capital+'</p>';
    output.innerHTML += '<p><strong>Region</strong>: '+country.region+'</p>';
    output.innerHTML += '<p><strong>Sub-Region</strong>: '+country.subregion+'</p>';
}