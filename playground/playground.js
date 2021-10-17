function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function generateCode (len) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    //console.log(`characters: ${characters}\nlen: ${len}\npossible combinations: ${numberWithCommas(Math.pow(characters.length, len))}\n`);
    
    let roomCode = '';
    for (let i = 0; i < len; i++) {
        roomCode += characters.charAt(Math.random() * characters.length);
    }
    return roomCode;
}

function assignRoomCode (roomsArray, roomCodeLength) {
    // Failsafe to stop the function from running if roomsArray is already full.
    let maxPossibleCombinations = Math.pow(36, roomCodeLength)
    if (roomsArray.length == maxPossibleCombinations) {
        console.log(`All possible combinations are already in the array, cannot add any more. Bye bye.`);
        return;
    }

    // Keep generating a new code until it doesn't already exist in the roomsArray,
    // and then push it into the roomsArray.
    let assigned = false;
    while (!assigned) {
        let tempCode = generateCode(roomCodeLength);

        if (roomsArray.includes(tempCode)) {
            console.log(`roomCode '${tempCode}' already exists. Generating new code instead.`);
        } else {
            roomsArray.push(tempCode);
            assigned = true;
        }
    }
}



let activeRoomCodes = [];
for (let i = 0; i < 50; i++) {
    assignRoomCode(activeRoomCodes, 6);
}
console.log(`activeRoomCodes: ${activeRoomCodes}`);