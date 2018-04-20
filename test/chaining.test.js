
const assert = require('assert');
const Complex = require('../index');


describe('test to chaining method', () => {
    it('should the calculate the chaining of a complex number', () => {
        const complex = new Complex(1, 1);

        const chainingComplex = complex
            .sum({ real: 2, imaginary:3 })
            .sub({ real: 1, imaginary:1 })
            .multiply({ real: 2, imaginary:-3 })
            .div({ real: 2, imaginary:3 });
        assert(chainingComplex.real === 2);
        assert(chainingComplex.imaginary === -3);
    });
});
