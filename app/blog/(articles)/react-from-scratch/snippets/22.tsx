// @ts-nocheck
const useRef = (initialState) => {
  const currentlyRenderingComponent =
    someGlobalObject.currentlyRenderingComponent;
  const useRefHookOrder = currentHookOrder;
  currentHookOrder += 1;
  if (!currentlyRenderingComponent.hasRendered) {
    currentlyRenderingComponent.hookState.push(
      Object.seal({ current: initialState })
    );
  }
  const ref = currentlyRenderingComponent.hookState[useRefHookOrder];
  return ref;
};