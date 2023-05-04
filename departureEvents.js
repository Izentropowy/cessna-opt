import * as departure from './departureCalc.js';

const button = document.querySelector('.btn');

const runway = document.getElementById('runway');
const surface = document.getElementById('surface');
const windDegrees = document.getElementById('wind-degrees');
const windMagnitude = document.getElementById('wind-magnitude');
const temperature = document.getElementById('oat');
const qnh = document.getElementById('qnh');
const elevation = document.getElementById('elevation');
const cruise = document.getElementById('cruise');

const tor = document.getElementById('tor');
const tod = document.getElementById('tod');
const roc = document.getElementById('roc');
const time = document.getElementById('time');
const distance = document.getElementById('distance');
const fuel = document.getElementById('fuel');

const variables = Array.from(document.querySelectorAll('.form-control'));

function calcAll(){
    let tor = departure.calcTorAndTod(qnh.value, elevation.value, temperature.value, windDegrees.value, windMagnitude.value, runway.value, surface.value)[0];
    let tod = departure.calcTorAndTod(qnh.value, elevation.value, temperature.value, windDegrees.value, windMagnitude.value, runway.value, surface.value)[1];    
    let roc = departure.calcRoc(qnh.value, elevation.value, cruise.value, temperature.value);
    let time = departure.calcClimbTime(qnh.value, elevation.value, cruise.value, temperature.value);
    let distance = departure.calcClimbDistance(qnh.value, elevation.value, cruise.value, temperature.value);
    let fuel = departure.calcClimbFuel(qnh.value, elevation.value, cruise.value, temperature.value);
    return [tor, tod, roc, time, distance, fuel];
}

function updateResults(){
    tor.textContent = calcAll()[0] + ' m';
    tod.textContent = calcAll()[1] + ' m';
    roc.textContent = calcAll()[2] + ' fpm';
    time.textContent = calcAll()[3] + ' min';
    distance.textContent = calcAll()[4] + ' nm';
    fuel.textContent = calcAll()[5] + ' l';
}

function validate(input){
    if (parseFloat(input.value) < input.min || parseFloat(input.value) > input.max || input.value == ""){
        input.classList.add("invalid");
        button.classList.add("shake");
        return false;
    }
    else if ((input === elevation || input === cruise) && parseFloat(elevation.value) >= parseFloat(cruise.value)){
        input.classList.add("invalid");
        button.classList.add("shake");
        alert("Pressure altitude is too high");
        return false;
    }
    // max pa value in tables
    else if (input === elevation && departure.calcPressAlt(qnh.value, elevation.value) > 8000 ){
        input.classList.add("invalid");
        button.classList.add("shake");
        alert("Pressure altitude is too high");
        return false;
    }
    // max pa value in tables
    else if (input === cruise && departure.calcPressAlt(qnh.value, cruise.value) > 12000 ){
        input.classList.add("invalid");
        button.classList.add("shake");
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
