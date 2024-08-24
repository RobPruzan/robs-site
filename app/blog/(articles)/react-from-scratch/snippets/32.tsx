// @ts-nocheck
export const createContext = <T,>(initialValue: T) => {
  const contextId = crypto.randomUUID();

  currentTreeRef.defaultContextState.push({
    contextId,
    state: initialValue,
  }); // explained later
  return {
    Provider: (data: {
      value: T;
      children: Array<
        ReactComponentInternalMetadata | null | false | undefined
      >;
    }) => {
      if (
        typeof data.value === "object" &&
        data.value &&
        "__internal-context" in data.value
      ) {
        // hack to associate an id with a provider, allowing us to determine if ProviderA === ProviderB. We could of used the function reference, but this was easier for debugging
        return contextId as unknown as ReturnType<typeof createElement>;
      }
      const el = createElement("div", null, ...data.children); // for i have sinned, ideally would of used a fragment
      console.log(el);
      if (!(el.kind === "real-element")) {
        throw new Error();
      }
      el.provider = {
        state: data.value, // the data that will be read by useContext
        contextId,
      };
      return el;
    },
  };
};