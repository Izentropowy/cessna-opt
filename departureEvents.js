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


function calcAll(){
    let tor = departure.calcTorAndTod(qnh.value, elevation.value, temperature.value, windDegrees.value, windMagnitude.value, runway.value)[0];
    let tod = departure.calcTorAndTod(qnh.value, elevation.value, temperature.value, windDegrees.value, windMagnitude.value, runway.value)[1];    
    let roc = departure.calcRoc(qnh.value, elevation.value, cruise.value, temperature.value);
    let time = departure.calcClimbTime(qnh.value, elevation.value, cruise.value, temperature.value);
    let distance = departure.calcClimbDistance(qnh.value, elevation.value, cruise.value, temperature.value);
    let fuel = departure.calcClimbFuel(qnh.value, elevation.value, cruise.value, temperature.value);
    return [tor, tod, roc, time, distance, fuel];
}

function updateResults(){
    tor.textContent = calcAll()[0];
    tod.textContent = calcAll()[1];
    roc.textContent = calcAll()[2];
    time.textContent = calcAll()[3];
    distance.textContent = calcAll()[4];
    fuel.textContent = calcAll()[5];
}


button.addEventListener('click', () => {
    calcAll();
    updateResults();
});
