let overworldInputs = document.querySelectorAll('.overworldCoords')
let netherInputs = document.querySelectorAll('.netherCoords')
let getBtn = document.getElementById('getCoordinates');
let resetBtn = document.getElementById('resetBtn');
let paragraphOne = document.getElementById('copyOverworldCoord');

overworldInputs.forEach(input =>{
    input.addEventListener('click', function(){
        netherInputs.forEach(input =>{
            input.disabled = true;
        })
    })
})

netherInputs.forEach(input =>{
    input.addEventListener('click', function(){
        overworldInputs.forEach(input =>{
            input.disabled = true;
        })
    })
})

function reset(){
    for(let i = 0; i < overworldInputs.length; i++){
        overworldInputs[i].value = '0';
        netherInputs[i].value = '0';
        netherInputs[i].disabled = false;
        overworldInputs[i].disabled = false;
    }
    paragraphOne.innerHTML = 'COORDINATES: [X,Y,Z]';
}

function getCoords(){
    let calculatedCords = [0,0,0];

    if(!overworldInputs[0].disabled && !netherInputs[0].disabled) return console.log("PLEASE ENTER COORDS");

    for(let i = 0; i < overworldInputs.length; i++){
        if(overworldInputs[i].disabled){ // load nether cords into
            calculatedCords[i] = netherInputs[i].value;
        }
        if(netherInputs[i].disabled){// load overworld cord
            calculatedCords[i] = overworldInputs[i].value;
        }
    }
    convertCords(calculatedCords);
    displayParagraph(calculatedCords);
}

function convertCords(coordinates){
    if(overworldInputs[0].disabled){
        coordinates[0] = Math.floor(coordinates[0] * 8); // x value
        coordinates[1] = Math.floor(parseInt(coordinates[1])); // y value
        coordinates[2] = Math.floor(coordinates[2] * 8); // z value 
    }
    if(netherInputs[0].disabled){
        coordinates[0] = Math.floor(coordinates[0] / 8);  // x value
        coordinates[1] = Math.floor(parseInt(coordinates[1])); // y value
        coordinates[2] = Math.floor(coordinates[2] / 8); // z value 
    }

    return coordinates;
}

function restrictAlphabet(e){
    var x = e.which || e.keycode;
    if((x>=48 && x <= 57)) return true;
    else return false;
}

function displayParagraph(calculatedCords){
    console.log("HERE");
    if(netherInputs[0].disabled) paragraphOne.innerHTML = `PLACE PORTAL AT COORDINATES: <a style="cursor: pointer;">[${calculatedCords[0]},${calculatedCords[1]},${calculatedCords[2]}] IN THE OVERWORLD</a>`;
    if(overworldInputs[0].disabled) paragraphOne.innerHTML = `PLACE PORTAL AT COORDINATES: <a style="cursor: pointer;">[${calculatedCords[0]},${calculatedCords[1]},${calculatedCords[2]}] IN THE NETHER</a>`;
    
    let textCopy = `${calculatedCords[0]},${calculatedCords[1]},${calculatedCords[2]}`
    navigator.clipboard.writeText(textCopy);
}