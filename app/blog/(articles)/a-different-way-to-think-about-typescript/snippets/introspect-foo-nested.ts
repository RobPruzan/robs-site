// @ts-nocheck
type Foo = null
type IntrospectFoo = Foo extends number | null
  ? Foo extends null
    ? "Foo constructs a set that is a subset of null"
    : "Foo constructs a set that of number"
  : "Foo constructs a set that is not a subset of number | null";

// Result = "Foo constructs a set that is a subset of null"