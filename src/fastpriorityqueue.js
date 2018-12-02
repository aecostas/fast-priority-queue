class FastPriorityQueue {

	constructor() {
		this.queues = {};
	}

	pull() {
		let keys = Object.keys(this.queues);

		if (keys.length === 0) {
			return null;
		}

		let index = Math.min(...keys);
	
		return this.queues[index].shift();
	}

	insert(value, priority) {
		if (!this.queues[priority]) {
			this.queues[priority] = [];
		} 
		
		this.queues[priority].push(value);
	}

}

module.exports = FastPriorityQueue;
