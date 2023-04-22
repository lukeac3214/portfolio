export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSort(array, animations);
    return animations;
  }
  
  function heapSort(array, animations) {
    var n = array.length;
  
    for (var i = (Math.floor(n/2)-1); i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    for (var k = n - 1; k > 0 ; k--) {
      swap(array, 0, k, animations);
      heapify(array, k, 0, animations);
    }
  }
  
  function heapify(array, n, i, animations) {
      var largest = i;
      var l = 2 * i + 1;
      var r = 2 * i + 2;
  
      if ((l < n) && (array[l] > array[largest])) {
        largest = l;
      }
  
      if ((r < n) && (array[r] > array[largest])) {
        largest = r;
      }
  
      if (largest !== i) {
        swap(array, i, largest, animations);
        heapify(array, n, largest, animations);
      }
  }

  function swap(array, i, j, animations) {
    animations.push([i, j]);
    animations.push([i, j]);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    animations.push([j, array[j], i, array[i]]);
}