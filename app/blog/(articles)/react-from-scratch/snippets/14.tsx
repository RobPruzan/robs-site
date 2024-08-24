// @ts-nocheck
let currentHookOrder = 0;

const useState = () => {
  let useStateHookOrder = currentHookORder;
  currentHookOrder += 1;
  // do some stuff
};