// @ts-nocheck
for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
  // $FlowFixMe[incompatible-use] found when upgrading Flow
  if (is(nextDeps[i], prevDeps[i])) {
    continue;
  }
  return false;
}
return true;