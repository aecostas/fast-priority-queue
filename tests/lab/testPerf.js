const { performance, PerformanceObserver } = require('perf_hooks');
const RANGE_OF_PRIORITIES = 50;
const RANGE_OF_NUMBERS = 10000;

var pqueue = require('../../src/fastpriorityqueue');

getRandom = function(max) {
    return Math.floor(Math.random() * max + 1);
}

measurePerformance = function(length, functionToMeasure) {
    return new Promise((resolve, reject) => {

        const fn = performance.timerify(functionToMeasure);
        const obs = new PerformanceObserver((list) => {
            obs.disconnect();
            performance.clearFunctions();
            resolve(list.getEntries()[0].duration);
        });
        obs.observe({ entryTypes: ['function'] });
        fn();
    });
}

let lengths = [1e2, 1e4, 1e6];
let promisesPull = [];
let promisesInsert = [];

for (let i=0; i<lengths.length; i++) {
    let queue = new pqueue();

    for (let length=0; length<lengths[i]; length++) {
        queue.insert(
            getRandom(RANGE_OF_PRIORITIES),
            getRandom(RANGE_OF_NUMBERS)
        );
    }

    promisesPull.push(measurePerformance(lengths[i], () => { queue.pull() }));
    promisesInsert.push(measurePerformance(lengths[i], () => { queue.insert() }));

}

Promise.all(promisesPull)
.then((times) => {
    console.log('pull: ', times);
    return Promise.all(promisesInsert);
})
.then((times) => {
    console.log('insert: ', times);
});
