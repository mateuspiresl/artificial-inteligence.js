class NeuralNetwork
{
  constructor (attributes, activationFunction=threshold, weightRange=2.5, learningRate=1, bias=0)
  {
    this._learningRate = learningRate;
    this._bias = 0;
    this._activate = activationFunction;
    this._weights = new Array(attributes);

    const weightMultiplier = weightRange / 0.5;

    for (let i = 0; i < attributes; i++)
      this._weights[i] = (Math.random() - 0.5) * weightMultiplier;
  }

  train (values, expectedResult)
  {
    const result = this.classify(values);
    console.log('learning result', result);
    const error = expectedResult - result;
    
    this._weights.forEach((weight, index) => {
      const variation = this._learningRate * error * values[index];
      this._weights[index] = weight + variation;
    });
  }

  classify (values)
  {
    if (values.length !== this._weights.length)
      throw new Error('In size is different from the expected');

    // Multiply each value by its respective weight
    values.forEach((value, index) => {
      values[index] = value * this._weights[index];
    });

    // Aditive join
    const join = values.reduce((result, value) => result + value, 0);

    // Active
    return this._activate(this._bias + join);
  }
}


// Activation functions

function threshold (value) {
  return value >= 1 ? 1 : 0;
}

function sigmoid (value) {
  return 1 / (1 + Math.exp(- this._activationParameter * value));
}

function sigmun (value) {
  return this._activationParameter * (value >= 0 ? 1 : -1);
}

function hiperbolicTangent (value)
{
  const params = this._activationParameter;
  const limitValue = params.limit * value;
  const positiveExp = Math.exp(limitValue);
  const negativeExp = Math.exp(-limitValue);

  return params.slope * ((positiveExp - negativeExp) / (2 * positiveExp));
}


NeuralNetwork.activationFunctions = {
  threshold: threshold,
  sigmoid: sigmoid,
  sigmun: sigmun,
  hiperbolicTangent: hiperbolicTangent
};


module.exports = NeuralNetwork;