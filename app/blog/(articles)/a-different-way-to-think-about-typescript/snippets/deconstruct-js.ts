// @ts-nocheck
assert(typeof myObject === "object" && "x" in myObject, "invalid shape"); // compile time only in TypeScript
const data = myObject["x"];
const x = data;