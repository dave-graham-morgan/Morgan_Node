const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });

  it("should format 1234 to 1,234", () => {
    expect(addCommas(1234)).toBe("1,234")
  })

  it('should format 1000000 correctly', () => {
    expect(addCommas(1000000)).toBe("1,000,000");
  })

  it('should format 9876543210 correctly', () => {
    expect(addCommas(9876543210)).toBe("9,876,543,210");
  })

  it('should format 6 correctly', () => {
    expect(addCommas(6)).toBe("6");
  })

  it('should format -10 correctly', () => {
    expect(addCommas(-10)).toBe("-10");
  })
  it('should format -5678 correctly', () => {
    expect(addCommas(-5678)).toBe("-5,678");
  })

  it('should format -56383838378 correctly', () => {
    expect(addCommas(-56383838378)).toBe("-56,383,838,378");
  })

});
