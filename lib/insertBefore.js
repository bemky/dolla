import toNodes from './toNodes.js';

/**
 * Inserts content before an anchor element. See {@link toNodes} for supported content types.
 *
 * @param {Element|Array|NodeList|HTMLCollection} anchor - An Element, Array, NodeList, or HTMLCollection
 * @param {Element|NodeList|HTMLCollection|Array|string|Object} content - Content to insert
 * @returns {Element|Node} The last inserted node
 */
export default function insertBefore(anchor, content) {
    if (Array.isArray(anchor) || anchor instanceof NodeList || anchor instanceof HTMLCollection) {
        return insertBefore(anchor[0], content);
    }

    const nodes = toNodes(content)
    for (const node of nodes.reverse()) {
        anchor.parentNode.insertBefore(node, anchor);
        anchor = node
    }
    return anchor
}
