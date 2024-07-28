// @ts-ignore
type InsideArray<T> = T extends Array<infer R>
  ? R
  : "T is not a subset of Array<unknown>";
type TheNumberInside = InsideArray<Array<number>>;
// TheNumberInside = number