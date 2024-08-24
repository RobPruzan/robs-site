const applyComponentsToDom = (
  viewNode: ReactViewNode,
  parentElement: HTMLElement | null
) => {
  switch (viewNode.internalMetadata.kind) {
    case "tag": {
      const element = document.createElement(
        viewNode.metadata.component.tagName
      );
      Object.assign(element, viewNode.metadata.props);
      parentElement?.appendChild(element);
      viewNode.metadata.childNodes.forEach((childNode) =>
        appendTagsToDOM(childNode, element)
      );
      break;
    }
    case "function": {
      applyComponentsToDom(viewNode.childNodes[0]); // a functional component has at most 1 child since every element must have a parent when returned
    }
  }
};