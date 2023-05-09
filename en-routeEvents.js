import { calcEnroute, calcPressAltCruise } from "./en-routeCalc.js";

const button = document.querySelector('.btn');

const mcp = document.getElementById('mcp');
const qnh = document.getElementById('qnh');
const cruise = document.getElementById('cruise');
const isaDev = document.getElementById('dev');
const windDegrees = document.getElementById('wind-degrees');
const windMagnitude = document.getElementById('wind-magnitude');

const rpm = document.getElementById('rpm');
const tas = document.getElementById('tas');
const fuel = document.getElementById('fuel');
const range = document.getElementById('range');
const endurance = document.getElementById('endurance');

const variables = Array.from(document.querySelectorAll('.form-control'));


function calcAll(){
    let rpm = calcEnroute(qnh.value, cruise.value, isaDev.value, mcp.value)[0];
    let tas = calcEnroute(qnh.value, cruise.value, isaDev.value, mcp.value)[1];  
    let fuel = calcEnroute(qnh.value, cruise.value, isaDev.value, mcp.value)[2];
    let range = calcEnroute(qnh.value, cruise.value, isaDev.value, mcp.value)[3];
    let endurance = calcEnroute(qnh.value, cruise.value, isaDev.value, mcp.value)[4];
    return [rpm, tas, fuel, range, endurance];
}

function updateResults(){
    rpm.textContent = calcAll()[0];
    tas.textContent = calcAll()[1] + ' kt';
    fuel.textContent = calcAll()[2] + ' l / h';
    range.textContent = calcAll()[3] + ' Nm';
    endurance.textContent = calcAll()[4];
}

function validate(input){
    if (parseFloat(input.value) < input.min || parseFloat(input.value) > input.max || input.value == ""){
        input.classList.add("invalid");
        button.classList.add("shake");
        return false;
    }

    // max pa value in tables
    else if (input === cruise && calcPressAltCruise(qnh.value, cruise.value) > 12000 ){
        input.classList.add("invalid");
        button.classList.add("shake");
        return false;
    }

    // max/min rpm value in tables
    else if (input === mcp){
        if (!calcEnroute(qnh.value, cruise.value, isaDev.value, mcp.value)[0]){
            input.classList.add("invalid");
            button.classList.add("shake");
            return false;
        }
    }
    input.classList.remove("invalid");
    return true;
}

function validateAll(){
    let validator = true;
    for (let element of variables) {
        if (!validate(element)) validator = false;
    }
    return validator;
}

button.addEventListener('click', () => {
    if (validateAll()){
        calcAll();
        updateResults();
    }
});

button.addEventListener('animationend', () => button.classList.remove("shake"));
