const variables = Array.from(document.querySelectorAll('.form-control'));

const blockFuel = document.getElementById('block-fuel');
const row1 = document.getElementById('row-1');
const row2 = document.getElementById('row-2');
const baggage1 = document.getElementById('baggage-1');
const baggage2 = document.getElementById('baggage-2');

const takeoffWeight = document.getElementById('tow');
const moment = document.getElementById('moment');

const ctx = document.getElementById('myChart');

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

function updateChart(totalMoment, totalMass){
    chart.data.datasets[2].data[0] = {x: totalMoment, y: totalMass};
    chart.update();
}

function calcResults(){
    fuel = calcFuelMass(blockFuel.value);
    let m = calcMoment(fuel, row1.value, row2.value, baggage1.value, baggage2.value);
    let w = calcWeight(fuel, row1.value, row2.value, baggage1.value, baggage2.value);
    takeoffWeight.textContent = w + ' kg';
    moment.textContent = m + ' kgm';
    updateChart(m, w);
}

variables.forEach(element => element.addEventListener('change', () => calcResults()));

var chart = new Chart(ctx, {
  data: {
    datasets: [{
        type: 'scatter',
        label: 'Normal',
        data: [
            {x:610.56, y:680.4},
            {x:783.36, y:884.5},
            {x:1198.08, y:1156.7},
            {x:1393.92, y:1156.7},
            {x:817.92, y:680.4},
            {x:610.56, y:680.4},
        ],
        borderWidth: 2,
        showLine: true,
        pointRadius: 0
    },{
        type: 'scatter',
        label: 'Utility',
        data: [
            {x:610.56, y:680.4},
            {x:783.36, y:884.5},
            {x:956.16, y:997.9},
            {x:1025.28, y:997.9},
            {x:691.2, y:680.4},
            {x:610.56, y:680.4},
        ],
        borderWidth: 2,
        showLine: true,
        pointRadius: 0
    },{
        type: 'scatter',
        label: 'Position',
        data: [
            {x:610, y:680},
        ],
        pointBackgroundColor: 'black',
        pointBorderColor: 'black',
        pointRadius: 3,
    }],
  },
});


