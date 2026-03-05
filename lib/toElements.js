import toNodes from './toNodes.js';

/**
 * @deprecated Use {@link toNodes} instead.
 */
export default function toElements(...args) {
    console.warn('toElements is deprecated, use toNodes instead.');
    return toNodes(...args);
}
