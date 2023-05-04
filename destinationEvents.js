import { calcLandingDistance } from './destinationCalc.js';
import { calcPressAlt } from './departureCalc.js';

const button = document.querySelector('.btn');

const runway = document.getElementById('runway');
const surface = document.getElementById('surface');
const windDegrees = document.getElementById('wind-degrees');
const windMagnitude = document.getElementById('wind-magnitude');
const temperature = document.getElementById('oat');
const qnh = document.getElementById('qnh');
const elevation = document.getElementById('elevation');
const flaps = document.getElementById('flaps');

const ld1 = document.getElementById('ld1');
const ld2 = document.getElementById('ld2');

const variables = Array.from(document.querySelectorAll('.form-control'));

function calcAll(){
    let ld1 = calcLandingDistance(qnh.value, elevation.value, temperature.value, windDegrees.value, windMagnitude.value, runway.value, surface.value, flaps.value)[0];
    let ld2 = calcLandingDistance(qnh.value, elevation.value, temperature.value, windDegrees.value, windMagnitude.value, runway.value, surface.value, flaps.value)[1];    
    return [ld1, ld2];
}

function updateResults(){
    ld1.textContent = calcAll()[0] + ' m';
    ld2.textContent = calcAll()[1] + ' m';
}

function validate(input){
    if (parseFloat(input.value) < input.min || parseFloat(input.value) > input.max || input.value == ""){
        input.classList.add("invalid");
        button.classList.add("shake");
        return false;
    }
    // max pa value in tables
    else if (input === elevation && calcPressAlt(qnh.value, elevation.value) > 8000 ){
        input.classList.add("invalid");
        button.classList.add("shake");
        alert("Pressure altitude is too high");
        return false;
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
