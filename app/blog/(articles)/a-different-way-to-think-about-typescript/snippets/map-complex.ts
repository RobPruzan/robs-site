// @ts-nocheck
type SetToMapOver = "string" | "bar";
type FirstChacter<T> = T extends `${infer R}${infer _}` ? R : never;
type Foo = {
  [K in SetToMapOver as `IM A ${FirstChacter<K>}`]: FirstChacter<K>;
};