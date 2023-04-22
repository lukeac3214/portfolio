export function getInsertSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    insertSort(array, animations);
    return animations;
}

function insertSort(array, animations) {
    let i, j, k;

    for (i = 1; i < array.length; i++) {
        k = array[i];
        j = i - 1;

        while (j >= 0 && array[j] > k) {
            animations.push([i, (j + 1)]);
            animations.push([i, (j + 1)]);
            array[j + 1] = array[j];
            animations.push([(j + 1), array[(j + 1)], j, array[j]]);
            j = j - 1;
        }

        array[j + 1] = k;
        animations.push([i, (j + 1)]);
        animations.push([i, (j + 1)]);
        animations.push([(j + 1), k, i, array[i]]);
    }
}