// @ts-nocheck
const someComplexFunction = (...args) => {

  // ...complex logic

  if (!invariant(datastructure)){
    console.error("This should never happen")
    return
  }
}