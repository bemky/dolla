import toNodes from './toNodes.js';

/**
 * Inserts content after an anchor element. See {@link toNodes} for supported content types.
 *
 * @param {Element|Array|NodeList|HTMLCollection} anchor - An Element, Array, NodeList, or HTMLCollection
 * @param {Element|NodeList|HTMLCollection|Array|string|Object} content - Content to insert
 * @returns {Element|Node} The last inserted node
 */
export default function insertAfter(anchor, content) {
    if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
        return insertAfter(anchor[anchor.length - 1], content);
    }

    const nodes = toNodes(content)
    for (const node of nodes) {
        anchor.parentNode.insertBefore(node, anchor.nextSibling);
        anchor = node
    }
    return anchor
}
