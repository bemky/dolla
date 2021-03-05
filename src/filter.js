export default function filter(nodes, predicate){
    const filteredNodes = [];
    nodes.forEach(node => {
      if (predicate(node)) filteredNodes.push(node);
    })
    return filteredNodes;
}