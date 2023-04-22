const variables = Array.from(document.querySelectorAll('.form-control'));

const blockFuel = document.getElementById('block-fuel');
const row1 = document.getElementById('row-1');
const row2 = document.getElementById('row-2');
const baggage1 = document.getElementById('baggage-1');
const baggage2 = document.getElementById('baggage-2');

const takeoffWeight = document.getElementById('tow');
const moment = document.getElementById('moment');

const BEM = 795.8;
const bemARM = 1.0864;
const fuelARM = 1.2192;
const row1ARM = 0.9398;
const row2ARM = 1.8542;
const bag1ARM = 2.413;
const bag2ARM = 3.1242;

function calcFuelMass(fuel){
    return fuel * 0.72;
}

function calcWeight(fuel, row1, row2, bag1, bag2){
    // allow blanks
    let values = [fuel, row1, row2, bag1, bag2, BEM];
    values = values.map(val => val === '' ? 0 : val);
    let totalMass = values.reduce((acc, val) => acc += parseFloat(val));
    return totalMass.toFixed(2);
}

function calcMoment(fuel, row1, row2, bag1, bag2){
    let moment0 = BEM * bemARM;
    let moment1 = fuel * fuelARM;
    let moment2 = row1 * row1ARM;
    let moment3 = row2 * row2ARM;
    let moment4 = bag1 * bag1ARM;
    let moment5 = bag2 * bag2ARM;
    let totalMoment = moment0 + moment1 + moment2 + moment3 + moment4 + moment5;
    return totalMoment.toFixed(2);
}

function calcResults(){
    fuel = calcFuelMass(blockFuel.value);
    takeoffWeight.textContent = calcWeight(fuel, row1.value, row2.value, baggage1.value, baggage2.value);
    moment.textContent = calcMoment(fuel, row1.value, row2.value, baggage1.value, baggage2.value);
}

variables.forEach(element => {
    element.addEventListener('change', () => {
        calcResults();
    })
});

