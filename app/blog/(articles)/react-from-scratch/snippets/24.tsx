const outputInternalMetadata = internalMetadata.component.function({
  ...renderNode.internalMetadata.props,
  children: internalMetadata.children,
});
const currentRenderEffects = outputInternalMetadata.hooks.filter(
  (hook) => hook.kind === "effect"
);

currentRenderEffects.forEach((effect, index) => {
  const didDepsChange = Utils.run(() => {
    if (!hasRendered) {
      return true;
    }
    const currentDeps = effect.deps;
    const previousDeps = previousRenderEffects[index];

    if (currentDeps.length !== previousDeps.length) {
      return true;
    }

    return !currentDeps.every((dep, index) => {
      const previousDep = previousDeps[index];
      return dep === previousDep;
    });
  });

  if (didDepsChange) {
    effect.cleanup?.();
    const cleanup = effect.cb();
    if (typeof cleanup === "function") {
      effect.cleanup = () => cleanup(); // typescript stuff
    }
  }
});