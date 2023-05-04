
import * as departure from './departureCalc.js';

export function calcLandingDistance(qnh, elevation, temperature, direction, magnitude, heading, surface, flaps){

    let table = [ 
      [ [   0, 0,  545, 1290],
        [1000, 0,  565, 1320],
        [2000, 0,  585, 1355],
        [3000, 0,  610, 1385],
        [4000, 0,  630, 1425],
        [5000, 0,  655, 1460],
        [6000, 0,  680, 1500],
        [7000, 0,  705, 1545],
        [8000, 0,  735, 1585] ],

      [ [   0, 10,  565, 1320],
        [1000, 10,  585, 1350],
        [2000, 10,  610, 1385],
        [3000, 10,  630, 1425],
        [4000, 10,  655, 1460],
        [5000, 10,  680, 1500],
        [6000, 10,  705, 1540],
        [7000, 10,  730, 1585],
        [8000, 10,  760, 1630] ],

      [ [   0, 20,  585, 1350],
        [1000, 20,  605, 1385],
        [2000, 20,  630, 1420],
        [3000, 20,  655, 1460],
        [4000, 20,  675, 1495],
        [5000, 20,  705, 1535],
        [6000, 20,  730, 1580],
        [7000, 20,  760, 1625],
        [8000, 20,  790, 1670] ],

      [ [   0, 30,  605, 1380],
        [1000, 30,  625, 1420],
        [2000, 30,  650, 1455],
        [3000, 30,  675, 1495],
        [4000, 30,  700, 1535],
        [5000, 30,  725, 1575],
        [6000, 30,  755, 1620],
        [7000, 30,  785, 1665],
        [8000, 30,  815, 1715] ],

      [ [   0, 40,  625, 1415],
        [1000, 40,  650, 1450],
        [2000, 40,  670, 1490],
        [3000, 40,  695, 1530],
        [4000, 40,  725, 1570],
        [5000, 40,  750, 1615],
        [6000, 40,  780, 1660],
        [7000, 40,  810, 1705],
        [8000, 40,  840, 1755] ]  ];

        // on the safe side
        if (temperature < 0) temperature = 0;

        let pressAlt = departure.calcPressAlt(qnh, elevation);
        // on the safe side
        if (pressAlt < 0) pressAlt = 0;

        let pressFloor = Math.floor(pressAlt / 1000) * 1000;
        let pressCeil = Math.ceil(pressAlt / 1000) * 1000;
            
        let tempFloor = Math.floor(temperature / 10) * 10;
        let tempCeil = Math.ceil(temperature / 10) * 10;

        // tables only with required temperatures
        let tempReduced = [table[tempFloor / 10], table[tempCeil / 10]];
        // tables only with required pressures for lower temp
        let pressReducedLowTemp = [tempReduced[0][pressFloor / 1000], tempReduced[0][pressCeil / 1000]];
        // tables only with required pressures for higher temp
        let pressReducedHighTemp = [tempReduced[1][pressFloor / 1000], tempReduced[1][pressCeil / 1000]];
        // calc TORs and TODs for respective temperatures
        let lowerLd1 = departure.interpolate(pressFloor, pressCeil, pressReducedLowTemp[0][2], pressReducedLowTemp[1][2], pressAlt);
        let higherLd1 = departure.interpolate(pressFloor, pressCeil, pressReducedHighTemp[0][2], pressReducedHighTemp[1][2], pressAlt);
        let lowerLd2 = departure.interpolate(pressFloor, pressCeil, pressReducedLowTemp[0][3], pressReducedLowTemp[1][3], pressAlt);
        let higherLd2 = departure.interpolate(pressFloor, pressCeil, pressReducedHighTemp[0][3], pressReducedHighTemp[1][3], pressAlt);
        // calc TOR
        let ld1 = departure.interpolate(tempFloor, tempCeil, lowerLd1, higherLd1, temperature);
        let ld2 = departure.interpolate(tempFloor, tempCeil, lowerLd2, higherLd2, temperature);

        // wind correction
        let hwc = departure.calcwindComponent(direction, magnitude, heading);
        if (hwc > 0){
            ld1 -= 1 / 90 * hwc * ld1;
            ld2 -= 1 / 90 * hwc * ld2;
        }
        else if (hwc < 0){
            ld1 += 1 / 20 * hwc * ld1;
            ld2 += 1 / 20 * hwc * ld2;
        }

        // surface correction
        if (surface === "Grass"){
            let factor = 0.45 * ld1;
            ld1 += factor;
            ld2 += factor;
        }

        // no flaps
        if (flaps === "0"){
            ld1 *= 1.35;
            ld2 *= 1.35;
        }

        // feet to meters
        ld1 *= 0.3048;
        ld2 *= 0.3048;

        return [ld1.toFixed(0), ld2.toFixed(0)];
}
