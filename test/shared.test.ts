import { describe } from "mocha";
import { sayHello } from "../src/shared.js";
import { expect } from "chai";

describe("hello", () => {
  it("Can say hello", () => {
    expect(sayHello("World")).to.equal("Hello World!");
  });
});
