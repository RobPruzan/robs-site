export const useCallback = <T,>(
  fn: () => T,
  deps: Array<unknown>
): (() => T) => {
  return useMemo(() => fn, deps);
};