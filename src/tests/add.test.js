// eslint-disable-next-line @typescript-eslint/no-var-requires
const add = require('../add.js')


describe("addTest(a, b)", () => {
    test("3+4=7", () => {
        const a = 3;
        const b = 4;
        const expected = 7;
        const result = add(a, b);

        expect(result).toBe(expected);
    });
});

describe("addTest(a, b)", () => {
    test("7+-4=3", () => {
        const a = 7;
        const b = -4;
        const expected = 3;
        const result = add(a, b);

        expect(result).toBe(expected);
    });
});

describe("addTest(a, b)", () => {
    test("\"6\"+\"4\"= 10", () => {
        const a = "6";
        const b = "4";
        const expected = 10;
        const result = add(a, b);

        expect(result).toBe(expected);
    });
});

