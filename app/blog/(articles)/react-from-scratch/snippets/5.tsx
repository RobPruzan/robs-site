export const createElement = <T extends AnyProps>(
  component: ReactComponentExternalMetadata<T>["component"],
  props: T,
  ...children: Array<ReactComponentInternalMetadata>
): ReactComponentInternalMetadata => ({
  component: mapComponentToTaggedUnion(externalMetadata.component), // impl left as an exercise to reader
  children: externalMetadata.children,
  props: externalMetadata.props,
  id: crypto.randomUUID(),
});