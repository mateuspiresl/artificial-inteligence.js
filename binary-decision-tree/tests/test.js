const Event = require('../event');
const DesicionTree = require('../');


const attributes = [
  new DesicionTree.Attribute('type', ['a', 'b']),
  new DesicionTree.Attribute('rate', ['low', 'normal', 'high']),
];

const eventA = new Event(true) .setValue('type', 'a').setValue('rate', 'low');
const eventB = new Event(false).setValue('type', 'b').setValue('rate', 'normal');
const eventC = new Event(true) .setValue('type', 'a').setValue('rate', 'high');
const eventD = new Event(false).setValue('type', 'b').setValue('rate', 'low');
const eventE = new Event(false).setValue('type', 'b').setValue('rate', 'normal');
const eventF = new Event(true) .setValue('type', 'a').setValue('rate', 'normal');
const eventG = new Event(false).setValue('type', 'b').setValue('rate', 'high');

const events = [
  eventA, eventB, eventC, eventD, eventE
];

const tree = new DesicionTree(attributes);
tree.train(events);

console.log('eventF', eventF.result === tree.classify(eventF))
console.log('eventG', eventG.result === tree.classify(eventG))

console.log();
console.log(JSON.stringify(tree));