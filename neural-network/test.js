const NeuralNetwork = require('./index');


const network = new NeuralNetwork(1);

for (let i = 0; i < 1000; i++)
{
  network.train([1], 0);
  network.train([0], 0);
  network.train([3], 1);
  network.train([8], 1);
  network.train([1], 0);
  network.train([10], 1);
  network.train([4], 1);
  network.train([0], 0);
  network.train([3], 1);
}

console.log('classify result', network.classify([0]));
console.log('classify result', network.classify([2]));
console.log('classify result', network.classify([5]));
console.log('classify result', network.classify([8]));