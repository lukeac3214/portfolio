export class MinHeap {
    constructor(length) {
        this.heap = new Array(length);
        this.size = 0;
    }

    getParent(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChild(i) {
        return (2 * i) + 1;
    }

    getRightChild(i) {
        return (2 * i) + 2;
    }

    // swaps two elements heap[x] and heap[y],
    // as well as updating the index stored at node.heapIndex
    swap(x, y) {
        const temp = this.heap[x];
        const tempIndex = this.heap[x].heapIndex;
        this.heap[x] = this.heap[y];
        this.heap[x].heapIndex = this.heap[y].heapIndex;
        this.heap[y] = temp;
        this.heap[y].heapIndex = tempIndex;
    }

    // ensures each node's parent is smaller than itself
    minHeapify(i) {
        const leftChild = this.getLeftChild(i);
        const rightChild = this.getRightChild(i);
        let smallest;

        if ((leftChild < this.size) && this.heap[leftChild].distance < this.heap[i].distance) smallest = leftChild;
        else smallest = i;

        if ((rightChild < this.size) && this.heap[rightChild].distance < this.heap[smallest].distance) smallest = rightChild;

        if (smallest !== i) {
            this.swap(i, smallest);
            this.minHeapify(smallest);
        }
    }

    // insert node at end of min heap,
    // then decrease key until node's parent is smaller and children are larger
    insert(node) {
        this.heap[this.size] = node;
        node.heapIndex = this.size;
        this.size++;
        this.decreaseKey(this.size - 1);
    }

    // moves a nodes index towards the front of the min heap
    // stopping when a node's parent is smaller than itself
    decreaseKey(i) {
        let parent = this.getParent(i);

        while ((i > 0) && (this.heap[parent].distance >= this.heap[i].distance)) {
            this.swap(i, parent);
            i = parent;
            parent = this.getParent(parent);
        }
    }

    // when a nodes value is changed, call minHeapify on it to ensure
    // minHeap property is maintained
    changeKey(node) {
        let index = node.heapIndex
        this.minHeapify(index)
    }

    // extract min, place largest element at head of minHeap, 
    // then call minHeapify to restore minHeap property
    extractMin() {
        if (this.size > 0) {
            const min = this.heap[0];
            min.heapIndex = null;
            this.heap[0] = this.heap[this.size - 1];
            this.heap[this.size - 1] = null;
            this.size--;
            this.minHeapify(0);
            return min;
        }
        else return null;
    }

    // returns true if elements exists in min heap, false otherwise
    contains(node) {
        if (node.heapIndex != null) return true;
        else return false;
    }
}
