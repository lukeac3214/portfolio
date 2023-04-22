export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, (array.length - 1), animations);
    return animations;
}

function quickSort(array, low, high, animations) {
    if (low < high) {
        let part = partition(array, low, high, animations)

        quickSort(array, low, (part - 1), animations);
        quickSort(array, (part + 1), high, animations);
    }
}

function partition(array, low, high, animations) {
    let pivot = array[high];
    let i = (low - 1);

    for (let j = low; j <= (high - 1); j++) {
        if (array[j] < pivot) {
            i++
            swap(array, i, j, animations);
        }
    }
    swap(array, i + 1, high, animations);
    return (i + 1);
}

function swap(array, i, j, animations) {
    animations.push([i, j]);
    animations.push([i, j]);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    animations.push([j, array[j], i, array[i]]);
}