// @ts-nocheck
const triggerReRender = (
  capturedCurrentlyRenderingRenderNode: ReactViewTreeNode
) => {
  const newViewTree = generateViewTree(capturedCurrentlyRenderingRenderNode);
  const parentNode = findParentNode(capturedCurrentlyRenderingRenderNode);
  replaceNode({
    parent: parentNode,
    oldNode: capturedCurrentlyRenderingRenderNode,
    newNode: newViewTree,
  });
  while (globalState.roomDomNode.firstChild) {
    removeDomTree(node.firstChild);
  }

  applyComponentsToDom(newViewTree, globalState.roomDomNode);
};