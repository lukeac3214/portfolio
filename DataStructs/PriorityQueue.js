// PriorityQueue maintains a sorted list of nodes with ascending distance values
export default class PriorityQueue {
    constructor() {
        this.pQueue = [];
    }

    enqueue(node) {
        // if array is empty just send it
        if (this.pQueue.length === 0) {
            this.pQueue.push(node);
        }
        else {
            let inserted = false
            for (let i = 0; i < this.pQueue.length && !inserted; i++) {
                if (node.distance <= this.pQueue[i].distance) {
                    this.pQueue.splice(i, 0, node)
                    inserted = true
                }
            }
            // if node wasn't inserted then it has the largest f value, push onto end of array
            if (!inserted) {
                this.pQueue.push(node);
            }
            
        }
    }
 
    dequeue() {
        let node = this.pQueue.shift()
        return node
    }

    requeue(targetNode) {
        let found = false
        let node = null
        for (let i = 0; i < this.pQueue.length && !found; i++) {
            if (targetNode === this.pQueue[i]) {
                node = this.pQueue.splice(i, 1)[0]
                found = true
            }
        }
        if (found) {
            this.enqueue(node)
        }
    }

    contains(targetNode) {
        for (let node in this.pQueue) {
            if (targetNode === node) {
                return true;
            }
            return false;
        }
    }
}