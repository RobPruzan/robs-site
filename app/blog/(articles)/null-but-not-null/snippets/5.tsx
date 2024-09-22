// @ts-nocheck
const someComplexFunction = (...args) => {

  // ...complex logic

  if (!invariant(datastructure)){
    throw new Error("This should never happen")
  }
}