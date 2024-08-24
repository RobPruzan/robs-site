const generateViewTree = ({
  internalMetadata,
}: {
  internalMetadata: ReactComponentInternalMetadata;
}): ReactViewTreeNode => {
  const newNode: ReactViewTreeNode = {
    id: crypto.randomUUID(),
    metadata: internalMetadata,
    childNodes: [],
  };

  switch (internalMetadata.component.kind) {
    case "function": {
      const outputInternalMetadata = internalMetadata.component.function({
        ...internalMetadata.props,
        children: internalMetadata.children,
      });

      const subViewTree = generateViewTreeHelper({
        internalMetadata: nextNodeToProcess,
      });

      newNode.childNodes.push(subViewTree);
      break;
    }
    case "tag": {
      newNode.childNodes = renderNode.internalMetadata.children.map(
        generateViewTreeHelper
      );
      break;
    }
  }

  return newNode;
};