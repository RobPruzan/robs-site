type FirstLetterUppercase<T extends string> =
  T extends `${infer R}${infer RestWord} ${infer RestSentence}`
    ? `${Uppercase<R>}${RestWord} ${FirstLetterUppercase<RestSentence>}` // recurssive call
    : T extends `${infer R}${infer RestWord}`
    ? `${Uppercase<R>}${RestWord}` // base case
    : never;
type UppercaseResult = FirstLetterUppercase<"upper case me">
// UppercaseResult = "Upper Case Me"