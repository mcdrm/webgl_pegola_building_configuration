export const extrudeSettings = (depth, bevelThickness, bevelSize, bevelOffset, bevelSegments) => {
    const setting = {
        steps: 1,
        depth: depth,
        bevelEnabled: true,
        bevelThickness: bevelThickness ?? 0,
        bevelSize: bevelSize ?? 0,
        bevelOffset: bevelOffset ?? 0,
        bevelSegments: bevelSegments ?? 1
    }
    
    return setting;
}

export const getDistanceAndCount = (initDistance, length) => {    
    let count, distance = 0;
    
    const tempCount = Math.floor(length / initDistance);
    if (length === tempCount * initDistance) {
        count = tempCount;
        distance = initDistance;
    } else if (length - tempCount * initDistance < initDistance / 2) {
        count = tempCount;
        distance = length / count;
    } else {
        count = tempCount + 1;
        distance = length / count;
    }

    return {
        distance, count
    }
}