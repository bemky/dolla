/**
 * This method returns if an element is focused
 * 
 * @param {Element} element - An Element
 * @returns {boolean} Boolean
 */
export default function isFocus(element){
    return document.activeElement === element;
}