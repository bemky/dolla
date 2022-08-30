export default function map(elements, method) {
  var results = [];
  Array.from(elements).forEach((el, i) => {
    results.push(method(el, i));
  });
  return results;
}