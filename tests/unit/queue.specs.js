var assert = require('assert');
var pqueue = require('../../src/fastpriorityqueue');

describe('', () => {

	it('Dequeue from empty queue', () => {
		let queue = new pqueue();

		assert.equal(queue.pull(), null);
	});

	it('Dequeue with some priorities - max priority at the beginning', () => {
		let queue = new pqueue();
		queue.insert(1,1);
		queue.insert(2,1);
		queue.insert(3,2);
		queue.insert(4,3);
		queue.insert(5,3);

		assert.equal(queue.pull(), 1);
	});

	it('Dequeue with some priorities', () => {
		let queue = new pqueue();
		queue.insert(1,2);
		queue.insert(2,2);
		queue.insert(3,1);
		queue.insert(4,3);
		queue.insert(5,3);

		assert.equal(queue.pull(), 3);
	});

});
