
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


// 2550lb
function takeoff(pressAlt, temperature)
{
    pressFloor = Math.floor(pressAlt / 1000) * 1000;
    pressCeil = Math.ceil(pressAlt / 1000) * 1000;

    tempFloor = Math.floor(temperature / 10) * 10;
    tempCeil = Math.ceil(temperature / 10) * 10;

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

        // tables reduction
        tempReduced = [table[tempFloor / 10], table[tempCeil / 10]];
        pressReducedLow = [tempReduced[0][pressFloor / 1000], tempReduced[0][pressCeil / 1000]];
        pressReducedHigh = [tempReduced[1][pressFloor / 1000], tempReduced[1][pressCeil / 1000]];

        // linear interpolation of ground Roll
        let groundRollLow = (pressAlt - pressReducedLow[0][0]) / (pressReducedLow[1][0] - pressReducedLow[0][0]) * (pressReducedLow[1][2] - pressReducedLow[0][2]) + pressReducedLow[0][2];

        let groundRollHigh = (pressAlt - pressReducedHigh[0][0]) / (pressReducedHigh[1][0] - pressReducedHigh[0][0]) * (pressReducedHigh[1][2] - pressReducedHigh[0][2]) + pressReducedHigh[0][2];
        
        let groundRoll = (temperature - tempFloor) / (tempCeil - tempFloor) * (groundRollHigh - groundRollLow) + groundRollLow;

        // linear interpolation of screenHeightClearance
        let screenHeightClearanceLow = (pressAlt - pressReducedLow[0][0]) / (pressReducedLow[1][0] - pressReducedLow[0][0]) * (pressReducedLow[1][3] - pressReducedLow[0][3]) + pressReducedLow[0][3];

        let screenHeightClearanceHigh = (pressAlt - pressReducedHigh[0][0]) / (pressReducedHigh[1][0] - pressReducedHigh[0][0]) * (pressReducedHigh[1][3] - pressReducedHigh[0][3]) + pressReducedHigh[0][3];
        
        let screenHeightClearance = (temperature - tempFloor) / (tempCeil - tempFloor) * (screenHeightClearanceHigh - screenHeightClearanceLow) + screenHeightClearanceLow;

        console.log(groundRoll, screenHeightClearance);
}

takeoff(1300, 8);