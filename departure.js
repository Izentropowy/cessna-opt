
// what do I need:
    // pressure altitude
        // qnh
        // elevation
    // temperature
    // wind
        // magnitude
        // direction
        // runway heading
    // runway surface

function calcPressAlt(qnh, elevation){
    let pa = elevation + 30 * (1013 - qnh);
    return pa;
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function calcwindComponent(direction, magnitude, heading){
    let angle = toRadians(Math.abs(direction - heading));
    let hwc = magnitude * Math.cos(angle);
    return hwc;
}

function interpolate(x1, x2, y1, y2, x){
    if (x1 === x2) return y1;
    return y1 + (x - x1) * (y2 - y1) / (x2 - x1);
}

function calcTorAndTod(pressAlt, temperature)
{
    let table = [
        [ 
            [   0, 0,  860, 1465],
            [1000, 0,  940, 1600],
            [2000, 0, 1025, 1755],
            [3000, 0, 1125, 1925],
            [4000, 0, 1235, 2120],
            [5000, 0, 1355, 2345],
            [6000, 0, 1495, 2605],
            [7000, 0, 1645, 2910],
            [8000, 0, 1820, 3265] ],
    
        [   [   0, 10,  925, 1575],
            [1000, 10, 1010, 1720],
            [2000, 10, 1110, 1890],
            [3000, 10, 1215, 2080],
            [4000, 10, 1335, 2295],
            [5000, 10, 1465, 2545],
            [6000, 10, 1615, 2830],
            [7000, 10, 1785, 3170],
            [8000, 10, 1970, 3575] ],
    
        [   [   0, 20,  995, 1690],
            [1000, 20, 1090, 1850],
            [2000, 20, 1195, 2035],
            [3000, 20, 1310, 2240],
            [4000, 20, 1440, 2480],
            [5000, 20, 1585, 2755],
            [6000, 20, 1745, 3075],
            [7000, 20, 1920, 3440],
            [8000, 20, 2120, 3880] ],
    
        [   [   0, 30, 1070, 1810],
            [1000, 30, 1170, 1990],
            [2000, 30, 1285, 2190],
            [3000, 30, 1410, 2420],
            [4000, 30, 1550, 2685],
            [5000, 30, 1705, 2975],
            [6000, 30, 1875, 3320],
            [7000, 30, 2065, 3730],
            [8000, 30, 2280, 4225] ],  
    
        [   [   0, 40, 1150, 1945],
            [1000, 40, 1260, 2135],
            [2000, 40, 1380, 2355],
            [3000, 40, 1515, 2605],
            [4000, 40, 1660, 2880],
            [5000, 40, 1825, 3205],
            [6000, 40, 2010, 3585],
            [7000, 40, 2215, 4045],
            [8000, 40, 2450, 4615] ]];

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
        let lowerTor = interpolate(pressFloor, pressCeil, pressReducedLowTemp[0][2], pressReducedLowTemp[1][2], pressAlt);
        let higherTor = interpolate(pressFloor, pressCeil, pressReducedHighTemp[0][2], pressReducedHighTemp[1][2], pressAlt);
        let lowerTod = interpolate(pressFloor, pressCeil, pressReducedLowTemp[0][3], pressReducedLowTemp[1][3], pressAlt);
        let higherTod = interpolate(pressFloor, pressCeil, pressReducedHighTemp[0][3], pressReducedHighTemp[1][3], pressAlt);
        // calc TOR
        let tor = interpolate(tempFloor, tempCeil, lowerTor, higherTor, temperature);
        let tod = interpolate(tempFloor, tempCeil, lowerTod, higherTod, temperature);

        return [tor, tod];
}

function calcRoc(pressAltTakeoff, pressAltCruise, temperature){
    let table = [
        [ 
            [   0, -20,  855],
            [2000, -20, 760],
            [4000, -20, 685],
            [6000, -20, 575],
            [8000, -20, 465], 
            [10000, -20, 360], 
            [12000, -20, 255] ],
    
        [   [   0, 0,  785],
            [2000, 0, 695],
            [4000, 0, 620],
            [6000, 0, 515],
            [8000, 0, 405], 
            [10000, 0, 300], 
            [12000, 0, 195] ],
    
        [   [   0, 20,  710],
            [2000, 20, 625],
            [4000, 20, 555],
            [6000, 20, 450],
            [8000, 20, 345],
            [10000, 20, 240], 
            [12000, 20, 135]  ],
    
        [   [   0, 40, 645],
            [2000, 40, 560],
            [4000, 40, 495],
            [6000, 40, 390],
            [8000, 40, 285],
            [10000, 40, 180], 
            [12000, 40, 0]  ]];
    
        // avg pressAlt for climb is 2/3 of the difference
        let pressAlt = 0.667 * (pressAltCruise - pressAltTakeoff);

        let pressFloor = Math.floor(pressAlt / 2000) * 2000;
        let pressCeil = Math.ceil(pressAlt / 2000) * 2000;

        let tempFloor = Math.floor(temperature / 20) * 20;
        let tempCeil = Math.ceil(temperature / 20) * 20;

        // tables only with required temperatures
        let tempReduced = [table[(tempFloor + 20) / 20], table[(tempCeil + 20) / 20]];
        // tables only with required pressures for lower temp
        let pressReducedLowTemp = [tempReduced[0][pressFloor / 2000], tempReduced[0][pressCeil / 2000]];
        // tables only with required pressures for higher temp
        let pressReducedHighTemp = [tempReduced[1][pressFloor / 2000], tempReduced[1][pressCeil / 2000]];
        // calc ROCs for respective temperatures
        let lowerRoc = interpolate(pressFloor, pressCeil, pressReducedLowTemp[0][2], pressReducedLowTemp[1][2], pressAlt);
        let higherRoc = interpolate(pressFloor, pressCeil, pressReducedHighTemp[0][2], pressReducedHighTemp[1][2], pressAlt);
        // calc ROC
        let roc = interpolate(tempFloor, tempCeil, lowerRoc, higherRoc, temperature);
        
        return roc;
}

calcRoc(0, 3000, 20);

funct