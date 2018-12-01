const { performance, PerformanceObserver } = require('perf_hooks');
const RANGE_OF_PRIORITIES = 50;
const RANGE_OF_NUMBERS = 10000;
const QUEUE_LENGTH = 100000;

var pqueue = require('../../src/fastpriorityqueue');

getRandom = function(max) {
    return Math.floor(Math.random() * max + 1);
}

measurePerformance = function(functionToMeasure) {
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

let queue100 = new pqueue();

for (let i=0; i<QUEUE_LENGTH; i++) {
    queue100.insert(
        getRandom(RANGE_OF_PRIORITIES),
        getRandom(RANGE_OF_NUMBERS)
    );
}

measurePerformance(()=>{queue100.pull()})
.then((pullTime) => {
    console.log('pull: ', pullTime);
    return measurePerformance(()=>{queue100.insert(200, 7)});
})
.then((insertTime) => {
    console.log('insert: ', insertTime);
});
