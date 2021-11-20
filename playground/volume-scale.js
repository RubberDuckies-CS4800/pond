function calcScale (userA, userB, radius, dropoffFactor) {
    // VIEW THE DESMOS PAGE HERE
    // https://www.desmos.com/calculator/iwz4q1tpqz
    // dropoffFactor must be greater than 0
    // smaller values mean volume drops off more slowly with distance
    // higher values mean that volume drops off more sharply
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // calculate distance
    // calculate x-intercept

    // if distance is between 0 and radius
        // return 1
    // if distance is between radius and x-intercept
        // return cos(b(x-r))
    // if distance is greater than x-intercept
        // return 0
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    let distance = Math.sqrt(Math.pow((userA.x - userB.x), 2) + Math.pow(userA.y - userB.y, 2));
    let period = 2 * Math.PI / Math.abs(dropoffFactor);
    let x_intercept = radius + (period / 4);
    let scale;
    //console.log(`distance: ${distance}`);
    //console.log(`period: ${period}`);
    //console.log(`x_intercept: ${x_intercept}`);
    
    if (distance <= radius) {
        scale = 1;
    } else if ((radius < distance) && (distance < x_intercept)) {
        scale = roundTo(Math.cos(dropoffFactor * (distance - radius)), 2);
    } else {
        scale = 0;
    }

    //console.log(`scale: ${scale}`);
    return scale;
}

function calcVolumeArray (userA, userArray) {
    // create empty array to hold all volumes

    // for each user in userArray
        // calculate scale
        // add that scale to volumeArray

    // return volumeArray
    // +++++++++++++++++++++++++++++++++++++++

    let volumeArray = [];

    for (const user of userArray) {
        let userScale = calcScale(userA, user, 2, 0.4);
        volumeArray.push(userScale);
    }

    return volumeArray;
}

function roundTo (num, decimals) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function calcMasterVolumeArray (userArray) {
    let masterVolumes = [];
    for (let i = 0; i < userArray.length; i++) {
        let volumes = calcVolumeArray(userArray[i], userArray);
        masterVolumes.push(volumes);
    }
    return masterVolumes;
}

function populateArray (arr, amount, decimals) {
    for (let i = 0; i < amount; i++) {
        let userx = roundTo(Math.random() * 10, decimals);
        let usery = roundTo(Math.random() * 10, decimals);
        arr.push({x: userx, y: usery});
    }
}

let userArray = [];
populateArray(userArray, 5, 2);
console.log(userArray);
console.log(calcMasterVolumeArray(userArray));