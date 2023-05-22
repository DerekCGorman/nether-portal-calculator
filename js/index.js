let overworldInputs = document.querySelectorAll(".overworldCoords");
let netherInputs = document.querySelectorAll(".netherCoords");
let getBtn = document.getElementById("getCoordinates");
let resetBtn = document.getElementById("resetBtn");
let paragraphOne = document.getElementById("copyOverworldCoord");
let count = 0;
let maxEntriesAllowed = 5;

overworldInputs.forEach((input) => {
  input.addEventListener("click", function () {
    netherInputs.forEach((input) => {
      input.disabled = true;
    });
  });
});

netherInputs.forEach((input) => {
  input.addEventListener("click", function () {
    overworldInputs.forEach((input) => {
      input.disabled = true;
    });
  });
});

function reset() {
  for (let i = 0; i < overworldInputs.length; i++) {
    overworldInputs[i].value = "0";
    netherInputs[i].value = "0";
    netherInputs[i].disabled = false;
    overworldInputs[i].disabled = false;
  }
  paragraphOne.innerHTML = "COORDINATES: [X,Y,Z]";
}

function isEveryInputEmpty() {
  let inputs = document.querySelectorAll(".coordInputs");
  for (let input in inputs) {
    if (inputs[input].value === "") return false;
  }
  return true;
}

function getCoords() {
  let calculatedCords = [0, 0, 0];
  let firstArr = [];
  let secondArr = [];
  let coordArr = [];

  if (isEveryInputEmpty() === false) return alert("EMPTY");
  if (!overworldInputs[0].disabled && !netherInputs[0].disabled)
    return alert("PLEASE ENTER COORDS");

  for (let i = 0; i < overworldInputs.length; i++) {
    if (overworldInputs[i].disabled) {
      // load nether cords into
      calculatedCords[i] = netherInputs[i].value;
      firstArr[i] = netherInputs[i].value;
    }
    if (netherInputs[i].disabled) {
      // load overworld cord
      calculatedCords[i] = overworldInputs[i].value;
      firstArr[i] = overworldInputs[i].value;
    }
  }

  secondArr = convertCords(calculatedCords);
  if (overworldInputs[0].disabled) {
    coordArr[1] = firstArr;
    coordArr[0] = secondArr;
  }
  if (netherInputs[0].disabled) {
    coordArr[0] = firstArr;
    coordArr[1] = secondArr;
  }
  //displayParagraph(coordArr[1]);
  addEntry(coordArr);
}

function addEntry(coordArr) {
  if (count < maxEntriesAllowed) {
    let newEntry = document.createElement("div");
    let overworldCoords = document.createElement("p");
    let netherCoords = document.createElement("p");
    let deleteEntry = document.createElement("span");
    let entryContainer = document.querySelector(".entry-container");
    let dataContainer = document.createElement("div");

    dataContainer.className = "data-container";

    deleteEntry.className = "deleteEntry";
    deleteEntry.innerHTML = "X";
    deleteEntry.addEventListener("click", removeEntry);

    newEntry.className = "table-data";
    overworldCoords.innerHTML = `[${coordArr[0]}]`;
    netherCoords.innerHTML = `[${coordArr[1]}]`;

    newEntry.appendChild(overworldCoords);
    newEntry.appendChild(netherCoords);

    dataContainer.appendChild(newEntry);
    dataContainer.appendChild(deleteEntry);
    entryContainer.appendChild(dataContainer);

    count += 1;
  } else alert("To many entries please remove some");

  reset();
}

function removeEntry() {
  this.parentElement.remove();
  count -= 1;
}

let clearEntryBtn = document.querySelector(".clearBtn");

clearEntryBtn.addEventListener("click", () => {
  let entries = document.querySelectorAll(".table-data");
  entries.forEach((entry) => {
    entry.parentElement.remove();
    count = 0;
  });
});

function deleteEntryFromList() {
  this.parentElement.remove();
}

function convertCords(coordinates) {
  if (overworldInputs[0].disabled) {
    coordinates[0] = Math.floor(coordinates[0] * 8); // x value
    coordinates[1] = Math.floor(parseInt(coordinates[1])); // y value
    coordinates[2] = Math.floor(coordinates[2] * 8); // z value
  }
  if (netherInputs[0].disabled) {
    coordinates[0] = Math.floor(coordinates[0] / 8); // x value
    coordinates[1] = Math.floor(parseInt(coordinates[1])); // y value
    coordinates[2] = Math.floor(coordinates[2] / 8); // z value
  }

  return coordinates;
}

function restrictAlphabet(e) {
  var x = e.which || e.keycode;
  if (x >= 48 && x <= 57) return true;
  else return false;
}

// function displayParagraph(calculatedCords) {
//   if (netherInputs[0].disabled)
//     paragraphOne.innerHTML = `PLACE PORTAL AT COORDINATES: <a style="cursor: pointer;">[${calculatedCords[0]},${calculatedCords[1]},${calculatedCords[2]}] IN THE OVERWORLD</a>`;
//   if (overworldInputs[0].disabled)
//     paragraphOne.innerHTML = `PLACE PORTAL AT COORDINATES: <a style="cursor: pointer;">[${calculatedCords[0]},${calculatedCords[1]},${calculatedCords[2]}] IN THE NETHER</a>`;

//   let textCopy = `${calculatedCords[0]},${calculatedCords[1]},${calculatedCords[2]}`;
//   navigator.clipboard.writeText(textCopy);
// }
