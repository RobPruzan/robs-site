// @ts-nocheck
type SetToMapOver = "string" | "bar";
type Foo = { [K in SetToMapOver]: K };