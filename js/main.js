let nameBar = document.getElementById("nameBar");
let urlBar = document.getElementById("urlBar");
let searchBar = document.getElementById("searchBar");
let mainBtn = document.getElementById("main-btn");
let boxArray;
let globalVar;

if (localStorage.getItem("Websites") == null) {
  boxArray = [];
} else {
  boxArray = JSON.parse(localStorage.getItem("Websites"));
  displayWebsites();
}

function addWebsite() {
  if (validateName()) {
    if (mainBtn.innerHTML == "Submit") {
      webInputs = {
        name: nameBar.value,
        url: urlBar.value,
      };

      boxArray.push(webInputs);
      localStorage.setItem("Websites", JSON.stringify(boxArray));

      displayWebsites();
      clearInputs();
    } else {
      changeContent();
      mainBtn.innerHTML = "Submit";
    }
  } else {
    alert("Please Check Inputs");
  }
}

function displayWebsites() {
  let subject = "";

  for (let i = 0; i < boxArray.length; i++) {
    subject += `
        <tr>
                <td class="fs-4 fw-bold align-middle w-75 ps-3 py-3">${boxArray[i].name}</td>
                <td class="text-end py-3">
                <button id="visit-btn" class="btn btn-primary px-3 py-2">
                <a class="text-decoration-none text-white" href="${boxArray[i].url}">Visit</a>
                </button>
                </td>
                <td class="py-3">
                <button onclick="updateContent(${i})" id="update-btn" class="btn btn-secondary px-3 py-2">Update</button>
                </td>
                <td class="py-3">
                <button onclick="removeBookmark(${i})" id="delete-btn" class="btn btn-danger px-3 py-2">Delete</button>
                </td>
            </tr>
        `;
  }
  document.getElementById("contentArea").innerHTML = subject;
}

function clearInputs() {
  nameBar.value = "";
  urlBar.value = "";
}

function removeBookmark(index) {
  boxArray.splice(index, 1);
  localStorage.setItem("Websites", JSON.stringify(boxArray));
  displayWebsites();
}

function validateName() {
  let regName = /^\w{3,}$/gi;
  return regName.test(nameBar.value);
}

function searching(term) {
  var selectedSubject = "";

  for (var i = 0; i < boxArray.length; i++)
    if (boxArray[i].name.toLowerCase().includes(term.toLowerCase())) {
      selectedSubject += `
        <tr>
                <td class="fs-4 fw-bold align-middle w-75 ps-3 py-3">${boxArray[i].name}</td>
                <td class="text-end py-3">
                <button id="visit-btn" class="btn btn-primary px-3 py-2">
                <a class="text-decoration-none text-white" href="${boxArray[i].url}">Visit</a>
                </button>
                </td>
                <td class="py-3">
                <button onclick="updateContent(${i})" id="update-btn" class="btn btn-secondary px-3 py-2">Update</button>
                </td>
                <td class="py-3">
                <button onclick="removeBookmark(${i})" id="delete-btn" class="btn btn-danger px-3 py-2">Delete</button>
                </td>
            </tr>
        `;
    }

  document.getElementById("contentArea").innerHTML = selectedSubject;
}

function updateContent(index) {
  nameBar.value = boxArray[index].name;
  urlBar.value = boxArray[index].url;
  globalVar = index;
  mainBtn.innerHTML = "Update";
}

function changeContent() {
  boxArray[globalVar].name = nameBar.value;
  boxArray[globalVar].url = urlBar.value;
  localStorage.setItem("Websites", JSON.stringify(boxArray));
  displayWebsites();
  clearInputs()
}
