const { performance, PerformanceObserver } = require('perf_hooks');

let timeArrays = [];
let testArray = [];

let bigArray = Array.from({length:10}, (_,id) => id);

// extract first element
const fn = performance.timerify(()=>{bigArray.shift()});
const obs = new PerformanceObserver((list) => {
    console.warn(list.getEntries()[0].duration);
    obs.disconnect();
    performance.clearFunctions();
});
obs.observe({ entryTypes: ['function'] });
fn();  

/*
for (let i=0; i<10000000; i++) {
    const fn = performance.timerify(()=>{testArray.push(1)});
    const obs = new PerformanceObserver((list) => {
        timeArrays.push(list.getEntries()[0].duration);
        obs.disconnect();
        performance.clearFunctions();
    });
    obs.observe({ entryTypes: ['function'] });
    fn();  
}

timeArrays.map(i=>console.warn(i));
*/