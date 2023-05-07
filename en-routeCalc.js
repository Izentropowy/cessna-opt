import { calcPressAlt, interpolate } from "./departureCalc.js";

function calc(qnh, cruise, isaDev, mcp){
    
    let table = [[
        [
            [2000, 2550, -20, 83, 117, 11.1],
            [2000, 2500, -20, 78, 115, 10.6],
            [2000, 2400, -20, 69, 111, 9.6],
            [2000, 2300, -20, 61, 105, 8.6],
            [2000, 2200, -20, 53, 99, 7.7],
            [2000, 2100, -20, 47, 92, 6.9]],
        
        [
            [4000, 2600, -20, 83, 120, 11.1],
            [4000, 2550, -20, 79, 118, 10.6],
            [4000, 2500, -20, 74, 115, 10.1],
            [4000, 2400, -20, 65, 110, 9.1],
            [4000, 2300, -20, 58, 104, 8.2],
            [4000, 2200, -20, 51, 98, 7.4],
            [4000, 2100, -20, 45, 91, 6.6]],

        [
            [6000, 2650, -20, 83, 122, 11.1],
            [6000, 2600, -20, 78, 120, 10.6],
            [6000, 2500, -20, 70, 115, 9.6],
            [6000, 2400, -20, 62, 109, 8.6],
            [6000, 2300, -20, 54, 103, 7.8],
            [6000, 2200, -20, 48, 96, 7.1]],

        [
            [8000, 2700, -20, 83, 125, 11.1],
            [8000, 2650, -20, 78, 122, 10.5],
            [8000, 2600, -20, 74, 120, 10.0],
            [8000, 2550, -20, 65, 114, 9.1],
            [8000, 2400, -20, 58, 108, 8.2],
            [8000, 2300, -20, 52, 101, 7.5],
            [8000, 2200, -20, 46, 94, 6.8]],
        
        [
            [10000, 2700, -20, 78, 124, 10.5],
            [10000, 2650, -20, 73, 122, 10.0],
            [10000, 2600, -20, 69, 119, 9.5],
            [10000, 2500, -20, 62, 113, 8.7],
            [10000, 2400, -20, 55, 106, 7.9],
            [10000, 2300, -20, 49, 100, 7.2]],

        [
            [12000, 2650, -20, 69, 121, 9.5],
            [12000, 2600, -20, 65, 118, 9.1],
            [12000, 2500, -20, 58, 111, 8.3],
            [12000, 2400, -20, 52, 105, 7.5],
            [12000, 2300, -20, 47, 98, 6.9]],
    ],

    [
        [
            [2000, 2550, 0, 77, 118, 10.5],
            [2000, 2500, 0, 73, 115, 9.9],
            [2000, 2400, 0, 64, 110, 9.0],
            [2000, 2300, 0, 57, 104, 8.1],
            [2000, 2200, 0, 50, 97, 7.3],
            [2000, 2100, 0, 44, 90, 6.6]],
        
        [
            [4000, 2600, 0, 77, 120, 10.4],
            [4000, 2550, 0, 73, 117, 9.9],
            [4000, 2500, 0, 69, 115, 9.5],
            [4000, 2400, 0, 61, 109, 8.5],
            [4000, 2300, 0, 54, 102, 7.7],
            [4000, 2200, 0, 48, 96, 7.0],
            [4000, 2100, 0, 42, 89, 6.4]],

        [
            [6000, 2650, 0, 77, 122, 10.4],
            [6000, 2600, 0, 73, 119, 9.9],
            [6000, 2500, 0, 65, 114, 9.0],
            [6000, 2400, 0, 57, 108, 8.2],
            [6000, 2300, 0, 51, 101, 7.4],
            [6000, 2200, 0, 45, 94, 6.7]],

        [
            [8000, 2700, 0, 77, 124, 10.4],
            [8000, 2650, 0, 72, 122, 9.9],
            [8000, 2600, 0, 68, 119, 9.4],
            [8000, 2550, 0, 61, 112, 8.6],
            [8000, 2400, 0, 54, 106, 7.8],
            [8000, 2300, 0, 48, 99, 7.1],
            [8000, 2200, 0, 43, 92, 6.5]],
        
        [
            [10000, 2700, 0, 72, 123, 9.8],
            [10000, 2650, 0, 68, 120, 9.4],
            [10000, 2600, 0, 64, 117, 9.0],
            [10000, 2500, 0, 57, 111, 8.2],
            [10000, 2400, 0, 51, 104, 7.5],
            [10000, 2300, 0, 46, 97, 6.8]],

        [
            [12000, 2650, 0, 64, 119, 8.9],
            [12000, 2600, 0, 61, 116, 8.5],
            [12000, 2500, 0, 54, 109, 7.8],
            [12000, 2400, 0, 49, 102, 7.1],
            [12000, 2300, 0, 44, 95, 6.6]],
    ],

    [
        [
            [2000, 2550, 20, 72, 117, 9.9],
            [2000, 2500, 20, 68, 115, 9.4],
            [2000, 2400, 20, 60, 109, 8.5],
            [2000, 2300, 20, 53, 102, 7.7],
            [2000, 2200, 20, 47, 95, 6.9],
            [2000, 2100, 20, 42, 89, 6.3]],
        
        [
            [4000, 2600, 20, 72, 119, 9.8],
            [4000, 2550, 20, 68, 117, 9.4],
            [4000, 2500, 20, 64, 114, 8.9],
            [4000, 2400, 20, 57, 107, 8.1],
            [4000, 2300, 20, 51, 101, 7.3],
            [4000, 2200, 20, 45, 94, 6.7],
            [4000, 2100, 20, 40, 87, 6.1]],

        [
            [6000, 2650, 20, 72, 121, 9.8],
            [6000, 2600, 20, 68, 118, 9.4],
            [6000, 2500, 20, 60, 112, 8.5],
            [6000, 2400, 20, 54, 106, 7.7],
            [6000, 2300, 20, 48, 99, 7.0],
            [6000, 2200, 20, 43, 92, 6.4]],

        [
            [8000, 2700, 20, 71, 123, 9.7],
            [8000, 2650, 20, 67, 120, 9.3],
            [8000, 2600, 20, 64, 117, 8.9],
            [8000, 2550, 20, 57, 111, 8.1],
            [8000, 2400, 20, 51, 104, 7.4],
            [8000, 2300, 20, 46, 97, 6.8],
            [8000, 2200, 20, 41, 90, 6.2]],
        
        [
            [10000, 2700, 20, 67, 122, 9.3],
            [10000, 2650, 20, 63, 119, 8.9],
            [10000, 2600, 20, 60, 115, 8.5],
            [10000, 2500, 20, 54, 109, 7.8],
            [10000, 2400, 20, 49, 102, 7.1],
            [10000, 2300, 20, 44, 95, 6.5]],

        [
            [12000, 2650, 20, 60, 117, 8.5],
            [12000, 2600, 20, 57, 114, 8.1],
            [12000, 2500, 20, 51, 107, 7.4],
            [12000, 2400, 20, 46, 100, 6.8],
            [12000, 2300, 20, 41, 92, 6.3]],
    ]];

    let pressAlt = calcPressAlt(qnh, 0);
    let pressAltCruise = parseFloat(pressAlt) + parseFloat(cruise);

    let pressFloor = Math.floor(pressAltCruise / 2000) * 2000;
    let pressCeil = Math.ceil(pressAltCruise / 2000) * 2000;

    let tempFloor = Math.floor(isaDev / 20) * 20;
    let tempCeil = Math.ceil(isaDev / 20) * 20;

    // tables only with required temperatures
    let tempReduced = [table[(tempFloor + 20) / 20], table[(tempCeil + 20) / 20]];
    
    // for each temperature table find 2 correspoding pressure tables
    let pressReducedLowTemp = [tempReduced[0][pressFloor / 1000 - 2], tempReduced[0][pressCeil / 1000 - 3]];
    let pressReducedHighTemp = [tempReduced[1][pressFloor / 1000 - 2], tempReduced[1][pressCeil / 1000 - 3]];
    
    // check if mcp is within range for current values
    if (!isMcpAvailable(mcp, pressReducedLowTemp[0])) return false;
    if (!isMcpAvailable(mcp, pressReducedLowTemp[1])) return false;
    if (!isMcpAvailable(mcp, pressReducedHighTemp[0])) return false;
    if (!isMcpAvailable(mcp, pressReducedHighTemp[1])) return false;

    // find values for lower temp
    let row1lowPressureLowTemp = findCorrespondingRows(mcp, pressReducedLowTemp[0])[0];
    let row2lowPressureLowTemp = findCorrespondingRows(mcp, pressReducedLowTemp[0])[1];

    let rpmlowPressureLowTemp = interpolate(row1lowPressureLowTemp[3], row2lowPressureLowTemp[3], row1lowPressureLowTemp[1], row2lowPressureLowTemp[1], parseFloat(mcp));
    let taslowPressureLowTemp = interpolate(row1lowPressureLowTemp[3], row2lowPressureLowTemp[3], row1lowPressureLowTemp[4], row2lowPressureLowTemp[4], parseFloat(mcp));
    let fuellowPressureLowTemp = interpolate(row1lowPressureLowTemp[3], row2lowPressureLowTemp[3], row1lowPressureLowTemp[5], row2lowPressureLowTemp[5], parseFloat(mcp));

    let row1highPressureLowTemp = findCorrespondingRows(mcp, pressReducedLowTemp[1])[0];
    let row2highPressureLowTemp = findCorrespondingRows(mcp, pressReducedLowTemp[1])[1];

    let rpmhighPressureLowTemp = interpolate(row1highPressureLowTemp[3], row2highPressureLowTemp[3], row1highPressureLowTemp[1], row2highPressureLowTemp[1], parseFloat(mcp));
    let tashighPressureLowTemp = interpolate(row1highPressureLowTemp[3], row2highPressureLowTemp[3], row1highPressureLowTemp[4], row2highPressureLowTemp[4], parseFloat(mcp));
    let fuelhighPressureLowTemp = interpolate(row1highPressureLowTemp[3], row2highPressureLowTemp[3], row1highPressureLowTemp[5], row2highPressureLowTemp[5], parseFloat(mcp));
    
    let rpmLowTemp = interpolate(pressFloor, pressCeil, rpmlowPressureLowTemp, rpmhighPressureLowTemp, pressAltCruise);
    let tasLowTemp = interpolate(pressFloor, pressCeil, taslowPressureLowTemp, tashighPressureLowTemp, pressAltCruise);
    let fuelLowTemp = interpolate(pressFloor, pressCeil, fuellowPressureLowTemp, fuelhighPressureLowTemp, pressAltCruise);
    
    // find values for higher temp
    let row1lowPressureHighTemp = findCorrespondingRows(mcp, pressReducedHighTemp[0])[0];
    let row2lowPressureHighTemp = findCorrespondingRows(mcp, pressReducedHighTemp[0])[1];
 
    let rpmlowPressureHighTemp = interpolate(row1lowPressureHighTemp[3], row2lowPressureHighTemp[3], row1lowPressureHighTemp[1], row2lowPressureHighTemp[1], parseFloat(mcp));
    let taslowPressureHighTemp = interpolate(row1lowPressureHighTemp[3], row2lowPressureHighTemp[3], row1lowPressureHighTemp[4], row2lowPressureHighTemp[4], parseFloat(mcp));
    let fuellowPressureHighTemp = interpolate(row1lowPressureHighTemp[3], row2lowPressureHighTemp[3], row1lowPressureHighTemp[5], row2lowPressureHighTemp[5], parseFloat(mcp));

    let row1highPressureHighTemp = findCorrespondingRows(mcp, pressReducedHighTemp[1])[0];
    let row2highPressureHighTemp = findCorrespondingRows(mcp, pressReducedHighTemp[1])[1];

    let rpmhighPressureHighTemp = interpolate(row1highPressureHighTemp[3], row2highPressureHighTemp[3], row1highPressureHighTemp[1], row2highPressureHighTemp[1], parseFloat(mcp));
    let tashighPressureHighTemp = interpolate(row1highPressureHighTemp[3], row2highPressureHighTemp[3], row1highPressureHighTemp[4], row2highPressureHighTemp[4], parseFloat(mcp));
    let fuelhighPressureHighTemp = interpolate(row1highPressureHighTemp[3], row2highPressureHighTemp[3], row1highPressureHighTemp[5], row2highPressureHighTemp[5], parseFloat(mcp));
    
    let rpmHighTemp = interpolate(pressFloor, pressCeil, rpmlowPressureHighTemp, rpmhighPressureHighTemp, pressAltCruise);
    let tasHighTemp = interpolate(pressFloor, pressCeil, taslowPressureHighTemp, tashighPressureHighTemp, pressAltCruise);
    let fuelHighTemp = interpolate(pressFloor, pressCeil, fuellowPressureHighTemp, fuelhighPressureHighTemp, pressAltCruise);
    
    // find final values
    let rpm = interpolate(tempFloor, tempCeil, rpmLowTemp, rpmHighTemp, isaDev);
    let tas = interpolate(tempFloor, tempCeil, tasLowTemp, tasHighTemp, isaDev);
    let fuel = interpolate(tempFloor, tempCeil, fuelLowTemp, fuelHighTemp, isaDev);

    return [rpm, tas, fuel];
}

function findCorrespondingRows(value, arr){
    if (value === "max") return [0, 0];
    else if (value === "min") return [arr.length - 1, arr.length - 1];
    else value = parseFloat(value);

    const searchedCol = arr.map(row => row[3]);
    if (searchedCol.includes(value)) return [arr[searchedCol.indexOf(value)], arr[searchedCol.indexOf(value)]];

    searchedCol.push(value);
    searchedCol.sort().reverse();
    return [arr[searchedCol.indexOf(value) - 1], arr[searchedCol.indexOf(value)]];
}

function isMcpAvailable(mcp, arr){
    if (mcp === "max" || mcp === "min") return true;
    let value = parseFloat(mcp);
    // if outside of an array
    if (value > arr[0][3] || value < arr[arr.length - 1][3]) return false;
    return true;
}

let results = calc(1000, 6000, 10, "50%");
console.log(results);