const { expect } = require('@jest/globals');
const sum = require('../app.js');

test ('Adding 2 + 5 should equal 7.', () => {
    expect(sum(2, 5)).toBe(7);
});