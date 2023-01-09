export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(array, animations) {
  const len = array.length - 1;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < (len - i); j++) {
      animations.push([j, (j + 1)]);
      animations.push([j, (j + 1)]);
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        animations.push([(j + 1), array[j + 1], j, array[j]]);
      }
      else {
        animations.push([j, array[j], (j + 1), array[j + 1]]);
      }
    }
  }
}