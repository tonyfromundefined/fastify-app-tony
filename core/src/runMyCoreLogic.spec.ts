import { runMyCoreLogic } from "./runMyCoreLogic";

describe("runMyCoreLogic", () => {
  it("returns `Success`", () => {
    expect(runMyCoreLogic()).toEqual("Success");
  });
});
