var bookmarkNameInput = document.getElementById("bookmarkName");
var WebsiteUrlInput = document.getElementById("WebsiteUrl");
var paragraphInput = document.getElementById("paragraph");
var formInput = document.getElementById("form");

var dataList = [];
if(localStorage.getItem("dataList") != null){
    dataList = JSON.parse(localStorage.getItem("dataList"));
    displayData();
}

function addData(){
    data = {
        name : bookmarkNameInput.value,
        url : WebsiteUrlInput.value,
    }
    dataList.push(data);
    localStorage.setItem("dataList", JSON.stringify(dataList));
    displayData();
}

function displayData(){
    var temp = ``;
    for(var i=0; i < dataList.length ; i++){
        temp += `
        <tr>
            <td> ${i+1} </td>
            <td> ${dataList[i].name} </td>
            <td><a href= ${dataList[i].url} target="_blank"><button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
            <td><button onclick="deleteData( ${i} )" class="btn btn-delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `
    }
    document.getElementById("myData").innerHTML = temp;
}

function deleteData(index){
    dataList.splice(index, 1);
    localStorage.setItem("dataList", JSON.stringify(dataList));
    displayData();
}

const isValidUrl = urlString =>{
    var inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
      return false;
    } else {
      return true;
    }
  } 

formInput.onsubmit = function (e){
    var urlValid = false;

    if(WebsiteUrlInput.value !== "" && isValidUrl(WebsiteUrlInput.value) === true){
        urlValid = true;
        addData();
    }
    else{
       paragraphInput.innerHTML = "invalid url"
    }

    if(urlValid === false){
        e.preventDefault();
    }
}