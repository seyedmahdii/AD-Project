let n = 4;
let ans = Number.MAX_VALUE;
// Boolean array to check if a node
// has been visited or not
let v = Array(n).fill(false);
let ansV = Array(n).fill(-1);
// Mark 0th node as visited
v[0] = true;

// Function to find the minimum weight Hamiltonian Cycle
function tsp(graph, currPos, n, count, cost) {
    // If last node is reached and it has a link
    // to the starting node i.e the source then
    // keep the minimum value out of the total cost
    // of traversal and "ans"
    // Finally return to check for more possible values
    if (count == n && graph[currPos][0]) {
        ans = Math.min(ans, cost + graph[currPos][0]);
        return;
    }

    // BACKTRACKING STEP
    // Loop to traverse the adjacency list
    // of currPos node and increasing the count
    // by 1 and cost by graph[currPos][i] value
    for (let i = 0; i < n; i++) {
        if (!v[i] && graph[currPos][i]) {
            // Mark as visited
            v[i] = true;
            ansV[count] = i;
            tsp(graph, i, n, count + 1, cost + graph[currPos][i]);

            // Mark ith node as unvisited
            v[i] = false;
        }
    }
}

export function runTSP(graph, n) {
    tsp(graph, 0, n, 1, 0);

    return ans;
}

// Implementation : https://www.geeksforgeeks.org/travelling-salesman-problem-implementation-using-backtracking/
