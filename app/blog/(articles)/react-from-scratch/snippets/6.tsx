// @ts-nocheck
const applyComponentsToDom = (metadata: ReactComponentInternalMetadata, parentElement: HTMLElement | null) => {
    if (metadata.component.kind === "tag") {
        const element = document.createElement(metadata.component.tagName);
        Object.assign(element, metadata.props);
        parentElement?.appendChild(element);
        metadata.childNodes.forEach(childNode => appendTagsToDOM(childNode, element));
    } else {
		throw Error("Not Implemented")
	}
}