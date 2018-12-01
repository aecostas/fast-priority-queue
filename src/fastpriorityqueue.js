class FastPriorityQueue {

	constructor() {
		this.queue = [];
	}

	pull() {
		if (this.queue.length === 0) {
			return null;
		}

		let pullIndex = this.queue.reduce((maxPriorityIndex, cur, index) => {
			return (this.queue[maxPriorityIndex].priority > cur.priority) ? index:maxPriorityIndex;
		}, 0);

		return this.queue.splice(pullIndex)[0].value;
	}

	insert(value, priority) {
		this.queue.push({value: value, priority: priority});
	}

}

module.exports = FastPriorityQueue;
