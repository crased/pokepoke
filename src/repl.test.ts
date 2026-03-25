import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";


describe.each([
  {input: "  hello  world  ",expected: ["hello", "world"],},
  {input: "  hell World  ",expected: ["hell", "world"],},
  // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      // likewise, the `toBe` function will fail the test if the values are not equal
      expect(actual[i]).toBe(expected[i]);
    }
  });
});