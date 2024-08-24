// what createElement will accept as input
export type ReactComponentExternalMetadata<T extends AnyProps> = {
  component: keyof HTMLElementTagNameMap | ReactComponentFunction<T>;
  props: T;
  children: Array<ReactComponentInternalMetadata>;
};

// internal representation of component metadata for easier processing
export type TagComponent = {
  kind: "tag";
  tagName: keyof HTMLElementTagNameMap;
};

export type FunctionalComponent = {
  kind: "function";
  name: string;
  function: (
    props: Record<string, unknown> | null
  ) => ReactComponentInternalMetadata;
};

export type ReactComponentInternalMetadata = {
  id: string;
  component: TagComponent | FunctionalComponent;
  props: AnyProps;
  children: Array<ReactComponentInternalMetadata>;
};