// Psuedocode from https://en.wikipedia.org/wiki/Depth-first_search
// procedure DFS(G, v) is
//     label v as discovered
//     for all directed edges from v to w that are in G.adjacentEdges(v) do
//         if vertex w is not labeled as discovered then
//             recursively call DFS(G, w)