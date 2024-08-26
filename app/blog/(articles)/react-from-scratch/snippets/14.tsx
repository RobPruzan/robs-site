// @ts-nocheck
let currentHookOrder = 0;

const useState = () => {
  let useStateHookOrder = currentHookOrder;
  currentHookOrder += 1;
  // do some stuff
};