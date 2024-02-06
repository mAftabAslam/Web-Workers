// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Existing code...
  
    // Function to perform sorting without Web Workers
    function performProcessingWithoutWorkers() {
      const startTime = new Date().getTime();
  
      const array = generateRandomArray(arraySize);
      array.sort();
  
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
  
      displayResult(`Processing without Web Workers took ${duration} milliseconds.`);
    }
  
    // Function to perform sorting with Web Workers
    function performProcessingWithWorkers() {
      const startTime = new Date().getTime();
  
      const worker = new Worker('js/worker.js');
  
      worker.onmessage = function (event) {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;
  
        displayResult(`Processing with Web Workers took ${duration} milliseconds.`);
      };
  
      worker.postMessage({ arraySize });
    }
    // Function to generate a random array
    function generateRandomArray(size) {
    const array = new Array(size);
    for (let i = 0; i < size; i++) {
      array[i] = Math.random();
    }
    return array;
    }
    // Function to perform sorting with two Web Workers
    function performProcessingWithTwoWorkers() {
      const startTime = new Date().getTime();
  
      const worker1 = new Worker('js/worker.js');
      const worker2 = new Worker('js/worker.js');
  
      // Shared array size
      const arraySize = 10000000;
  
      // Send the range of indices to each worker
      const midIndex = arraySize / 2;
      const array1 = generateRandomArray(midIndex);
      const array2 = generateRandomArray(midIndex);
  
      worker1.onmessage = worker2.onmessage = function (event) {
        console.log(event.data.result); // Log the result to the console
        // After both workers complete, calculate the total duration
        if (event.data.worker === 2) {
          const endTime = new Date().getTime();
          const duration = endTime - startTime;
          displayResult(`Processing with Two Web Workers took ${duration} milliseconds.`);
        }
      };
  
      // Post messages to each worker with its assigned array
      worker1.postMessage({ array: array1, worker: 1 });
      worker2.postMessage({ array: array2, worker: 2 });
    }
  
    // Existing code...
  
    // Ensure these functions are defined before the button click events
    document.getElementById('start-processing').addEventListener('click', performProcessingWithoutWorkers);
    document.getElementById('start-processing-workers').addEventListener('click', performProcessingWithWorkers);
    document.getElementById('start-processing-two-workers').addEventListener('click', performProcessingWithTwoWorkers);
  });
  
  // ... existing code ...
  