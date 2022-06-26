function makeAdjMatrix(distances, n) {
    let matrix = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(n).fill(0);
    }

    let map = {},
        vNo = 0;
    for (let i = 0; i < distances.length; i++) {
        let item = distances[i];
        if (!Boolean(map[item.id])) {
            map[item.id] = vNo;
            vNo++;
        }
    }

    // console.log(map);

    for (let i = 0; i < distances.length; i++) {
        let item = distances[i];
        let src = item?.from?.id;
        let dest = item?.to?.id;
        matrix[src][dest] = matrix[dest][src] = item.distance;
    }

    return matrix;
}

export function makeIDMap(vertexes, n) {
    console.log(vertexes);
    let map = {},
        vNo = 0;
    for (let i = 0; i < n; i++) {
        let item = vertexes[i];
        if (map[item.id] !== undefined) {
            map[item.id] = vNo;
            vNo++;
        }
    }

    return map;
}

export default makeAdjMatrix;
