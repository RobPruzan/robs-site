// @ts-nocheck
type IntrospectFoo = number | null | string extends number
  ? "number | null | string constructs a set that is a subset of number"
  : "number | null | string constructs a set that is not a subset of number";

// IntrospectFoo = "number | null | string is not a subset of number"