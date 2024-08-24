export const useContext = <T,>(
  context: ReturnType<typeof createContext<T>>
) => {
  const providerId = context.Provider({
    value: {
      "__internal-context": true,
    },
  } as any) as unknown as string;
  const state = searchForContextStateUpwards(
    currentlyRenderingComponent,
    providerId
  );
  return state as T;
};