const Injector = require("babel!../src/injector.js");
const expect = require("chai").expect;

describe("injector", () => {
    describe("injector instantiation", () => {
        it("should be instantiable through new", () => {
            const injector = new Injector();
            expect(injector).to.be.an("object");
        });
    });
    describe("provided object instantiation", () => {
        it("should instantiate a class with no-arg constructor", () => {
            class A {};
            const injector = new Injector();
            const a = injector.get(A);
            expect(a).not.to.be.null;
            expect(a).to.be.an("object");
            expect(a).to.be.an.instanceof(A);
        });
        it("should default to singleton instantiation", () => {
            class A {};
            const injector = new Injector();
            const a1 = injector.get(A);
            const a2 = injector.get(A);
            expect(a1).to.equal(a2);
        });
    });
});
