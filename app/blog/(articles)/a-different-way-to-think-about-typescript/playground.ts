// type Foo = {[K in "string" | "bar" as number]: K}


// type FirstLetterUppercase<T extends string> =
//   T extends `${infer R}${infer RestWord} ${infer RestSentence}`
//     ? `${Uppercase<R>}${RestWord} ${FirstLetterUppercase<RestSentence>}`
//     : T extends `${infer R}${infer RestWord}`
//     ? `${Uppercase<R>}${RestWord}`
//   : never;
    

  // type SetToMapOver = "string" | "bar";
  // type FirstChacter<T> = T extends `${infer R}${infer _}` ? R : never;
  // type Foo = {
  //   [K in SetToMapOver as `IM A ${FirstChacter<K>}`]: FirstChacter<K>;
  // };


//   type Foo = number | null | string;
// type IntrospectFoo = Foo extends number
//   ? "Numbers are in the set of Foo :)"
//   : "Numbers are not in the set of Foo :(";


  // type IntrospectFoo<T> = T extends number  | null

  //   ? "A"
  //   : "B"



  // type Test = IntrospectFoo<number | string>


  // type IntrospectFoo = number | null | string extends number
  // ? "the set number constructs does not contain all members of the provided set"
  // : "the set number constructs contains all members of the provided set";



//   type IntrospectFoo<T> = [T] extends [number | null]
//   ? T extends null
//     ? "T constructs a set containing only null"
//     : "T constructs a set containing only number"
//   : "T constructs a set with items not included in number | null";
// type Result = IntrospectFoo<number | string>
// // Result = "T constructs a set with items not included in number | null";