const colors = [
    { r: 93, g: 111, b: 199 },
    { r: 164, g: 93, b: 199 },
    { r: 199, g: 93, b: 151 },
    { r: 199, g: 93, b: 93 },
    { r: 199, g: 153, b: 93 },
    { r: 178, g: 199, b: 93 },
    { r: 104, g: 199, b: 93 },
    { r: 93, g: 199, b: 164 },
    { r: 93, g: 180, b: 199 },
    { r: 93, g: 129, b: 199 }
];

let colorIndex = Math.floor(Math.random() * colors.length);
let randColor = colors[colorIndex];

console.log(`Red: ${randColor.r}, Green: ${randColor.g}, Blue: ${randColor.b}`);