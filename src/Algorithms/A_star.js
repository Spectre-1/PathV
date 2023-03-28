function euclideanDistance(nodeA, nodeB) {
    const dx = Math.abs(nodeA.col - nodeB.col);
    const dy = Math.abs(nodeA.row - nodeB.row);
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  export function aStar(grid, startNode, finishNode) {
    const openSet = [startNode];
    const closedSet = new Set();
    startNode.gScore = 0;
    startNode.fScore = euclideanDistance(startNode, finishNode);
    
    while (openSet.length > 0) {
      sortNodesByFScore(openSet);
      const currentNode = openSet.shift();
  
      if (currentNode === finishNode) {
        return getPath(finishNode);
      }
  
      closedSet.add(currentNode);
  
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (closedSet.has(neighbor) || neighbor.isWall) {
          continue;
        }
  
        const tentativeGScore = currentNode.gScore + 1;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeGScore >= neighbor.gScore) {
          continue;
        }
  
        neighbor.previousNode = currentNode;
        neighbor.gScore = tentativeGScore;
        neighbor.fScore = neighbor.gScore + euclideanDistance(neighbor, finishNode);
      }
    }
  
    return [];
  }
  
  function sortNodesByFScore(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.fScore - nodeB.fScore);
  }
  
  function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
  }
  
  function getPath(node) {
    const path = [];
    let currentNode = node;
    while (currentNode.previousNode) {
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    path.unshift(currentNode);
    return path;
  }
  