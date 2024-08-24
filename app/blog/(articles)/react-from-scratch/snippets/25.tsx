export const useMemo = (cb: () => void, deps: Array<unknown>) => {
  const useMemoHookOrder = currentHookORder;
  currentHookORder += 1;

  if (!currentlyRendering.hasRendered) {
    currentlyRendering.hooks.push({
      cb,
      deps,
      cleanup: null,
    });
  }
  const memo = currentlyRendering.hooks[useMemoHookOrder];

  if (
    memo.deps.length !== deps.length ||
    !memo.deps.every((dep, index) => {
      const newDep = deps[index];
      return newDep === dep;
    })
  ) {
    const value = cb();
    memo.value = value;
    return value;
  }
  return memo.value;
};