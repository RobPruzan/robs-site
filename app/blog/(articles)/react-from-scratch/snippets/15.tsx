const useState = (initialState) => {
  const currentlyRenderingComponent =
    someGlobalObject.currentlyRenderingComponent;
  const useStateHookOrder = currentHookOrder;
  currentHookOrder += 1;
  if (!currentlyRenderingComponent.hasRendered) {
    currentlyRenderingComponent.hookState.push(initialState);
  }
  const state = currentlyRenderingComponent.hookState[currentHookOrder];
  return [
    state,
    (value) => {
      currentlyRenderingComponent.hookState[useStateHookOrder] = value;
      triggerReRender(currentlyRenderingComponent); // TODO
    },
  ];
};