// Psuedocode from  https://en.wikipedia.org/wiki/Breadth-first_search
// 1  procedure BFS(G, root) is
// 2      let Q be a queue
// 3      label root as explored
// 4      Q.enqueue(root)
// 5      while Q is not empty do
// 6          v := Q.dequeue()
// 7          if v is the goal then
// 8              return v
// 9          for all edges from v to w in G.adjacentEdges(v) do
// 10              if w is not labeled as explored then
// 11                  label w as explored
// 12                  w.parent := v
// 13                  Q.enqueue(w)

export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = [];
    queue.push(startNode);
    startNode.isVisited = true;
    
    while (!!queue.length) {
      const currentNode = queue.shift();
      visitedNodesInOrder.push(currentNode);
      
      if (currentNode === finishNode) {
        return visitedNodesInOrder;
      }
      
      const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of unvisitedNeighbors) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
    
    return visitedNodesInOrder;
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
  }
  
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    
    return nodesInShortestPathOrder;
  }
  