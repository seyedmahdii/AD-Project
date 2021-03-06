let NO_PARENT = -1;

function dijkstra(adjacencyMatrix, startVertex) {
    let nVertices = adjacencyMatrix[0].length;

    // shortestDistances[i] will hold the shortest distance from src to i
    let shortestDistances = new Array(nVertices);

    // added[i] will true if vertex i is
    // included / in shortest path tree
    // or shortest distance from src to
    // i is finalized
    let added = new Array(nVertices);

    for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
        shortestDistances[vertexIndex] = Number.MAX_VALUE;
        added[vertexIndex] = false;
    }

    // Distance of source vertex from
    // itself is always 0
    shortestDistances[startVertex] = 0;

    // Parent array to store shortest
    // path tree
    let parents = new Array(nVertices);

    // The starting vertex does not
    // have a parent
    parents[startVertex] = NO_PARENT;

    // Find shortest path for all
    // vertices
    for (let i = 1; i < nVertices; i++) {
        // Pick the minimum distance vertex
        // from the set of vertices not yet
        // processed. nearestVertex is
        // always equal to startNode in
        // first iteration.
        let nearestVertex = -1;
        let shortestDistance = Number.MAX_VALUE;
        for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
            if (
                !added[vertexIndex] &&
                shortestDistances[vertexIndex] < shortestDistance
            ) {
                nearestVertex = vertexIndex;
                shortestDistance = shortestDistances[vertexIndex];
            }
        }

        added[nearestVertex] = true;

        // Update dist value of the
        // adjacent vertices of the
        // picked vertex.
        for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
            let edgeDistance = adjacencyMatrix[nearestVertex][vertexIndex];

            if (
                edgeDistance > 0 &&
                shortestDistance + edgeDistance < shortestDistances[vertexIndex]
            ) {
                parents[vertexIndex] = nearestVertex;
                shortestDistances[vertexIndex] =
                    shortestDistance + edgeDistance;
            }
        }
    }

    return printSolution(startVertex, shortestDistances, parents);
}

function printSolution(startVertex, distances, parents) {
    let nVertices = distances.length;

    let results = [];
    for (let vertexIndex = 0; vertexIndex < nVertices; vertexIndex++) {
        if (vertexIndex != startVertex) {
            const s = new Set();
            printPath(vertexIndex, parents, s);
            let newItem = {
                from: startVertex,
                to: vertexIndex,
                distance: distances[vertexIndex],
                path: [...s],
            };

            results = [...results, newItem];
        }
    }

    return results;
}

function printPath(currentVertex, parents, s) {
    // Base case : Source node has
    // been processed
    if (currentVertex == NO_PARENT) {
        return;
    }
    printPath(parents[currentVertex], parents, s);

    s.add(currentVertex);
}

export default dijkstra;

// **********************************************************

// import Queue from "./queue";
// const add_edge = (adj = [], src, dest) => {
//     adj[src].push_back(dest);
//     adj[dest].push_back(src);
// };

// // Function which finds all the paths
// // and stores it in paths array
// const find_paths = (paths, path, parent, n, u) => {
//     // Base Case
//     if (u == -1) {
//         paths.push_back(path);
//         return;
//     }

//     // Loop for all the parents
//     // of the given vertex
//     for (let par in parent[u]) {
//         // Insert the current
//         // vertex in path
//         path.push_back(u);

//         // Recursive call for its parent
//         find_paths(paths, path, parent, n, par);

//         // Remove the current vertex
//         path.pop_back();
//     }
// };

// // Function which performs bfs
// // from the given source vertex
// const bfs = (adj, parent, n, start) => {
//     // dist will contain shortest distance
//     // from start to every other vertex
//     let dist = new Array(n).fill(Number.MAX_VALUE);

//     const q = new Queue();

//     // Insert source vertex in queue and make
//     // its parent -1 and distance 0
//     q.enqueue(start);
//     parent[start].fill(-1);
//     dist[start] = 0;

//     // Until Queue is empty
//     while (!q.isEmpty()) {
//         let u = q.front();
//         q.dequeue();
//         for (let v in adj[u]) {
//             if (dist[v] > dist[u] + 1) {
//                 // A shorter distance is found
//                 // So erase all the previous parents
//                 // and insert new parent u in parent[v]
//                 dist[v] = dist[u] + 1;
//                 q.enqueue(v);
//                 parent[v].clear();
//                 parent[v].push_back(u);
//             } else if (dist[v] == dist[u] + 1) {
//                 // Another candidate parent for
//                 // shortes path found
//                 parent[v].push_back(u);
//             }
//         }
//     }
// };

// // Function which prints all the paths
// // from start to end
// const print_paths = (adj = [], n, start, end) => {
//     let paths = [];
//     let path = [];
//     let parent = [];

//     // Function call to bfs
//     bfs(adj, parent, n, start);

//     // Function call to find_paths
//     find_paths(paths, path, parent, n, end);

//     for (let v in paths) {
//         // Since paths contain each
//         // path in reverse order,
//         // so reverse it
//         reverse(v.begin(), v.end());

//         // Print node for the current path
//         for (let u in v) console.log(`${u} `);
//     }
// };

// function mainnn() {
//     // Number of vertices
//     let n = 6;

//     // array of vectors is used
//     // to store the graph
//     // in the form of an adjacency list
//     let adj = [];

//     // Given Graph
//     add_edge(adj, 0, 1);
//     add_edge(adj, 0, 2);
//     add_edge(adj, 1, 3);
//     add_edge(adj, 1, 4);
//     add_edge(adj, 2, 3);
//     add_edge(adj, 3, 5);
//     add_edge(adj, 4, 5);

//     // Given source and destination
//     let src = 0;
//     let dest = n - 1;

//     // Function Call
//     print_paths(adj, n, src, dest);
// }
