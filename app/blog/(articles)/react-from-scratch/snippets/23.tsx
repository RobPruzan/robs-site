// @ts-nocheck
export const useEffect = (cb: () => void, deps: Array<unknown>) => {
  const useEffectHookOrder = currentHookORder;
  currentHookORder += 1;

  if (!currentlyRendering.hasRendered) {
    currentlyRendering.hooks.push({
      cb,
      deps,
      cleanup: null,
      kind: "effect"
    });
  }
  const effect = currentlyRendering.hooks[currentStateOrder];

  if (
    effect.deps.length !== deps.length ||
    !effect.deps.every((dep, index) => {
      const newDep = deps[index];
      return newDep === dep;
    })
  ) {
    effect.deps = deps;
    effect.cb = cb;
  }
};