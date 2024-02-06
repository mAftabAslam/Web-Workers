// js/worker.js
onmessage = function (event) {
    const array = event.data.array;
    const workerNumber = event.data.worker;
  
    // Log a message to indicate that the Web Worker is processing
    console.log(`Web Worker ${workerNumber} is processing...`);
  
    // Simulate a heavy computation: Sorting the array
    array.sort();
  
    postMessage({ result: `Processing with Web Worker ${workerNumber} completed.`, worker: workerNumber });
  };
  