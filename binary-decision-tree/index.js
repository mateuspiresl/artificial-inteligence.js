const Event = require('./event');


class BinaryDecisionTree
{
  constructor (attributes)
  {
    this.attributes = attributes;
    this.root = null;
  }

  train (events, attributes=this.attributes)
  {
    const { matching, index } = this._getBestAttribute(events, attributes);
    const node = new Node(matching.attribute);

    if (this.root === null)
      this.root = node;

    for (let value in matching.values)
    {
      const valueMatching = matching.values[value];

      try {
        node.add(value, valueMatching.getExclusiveResult());
      }
      catch (error)
      {
        const eventsLeft = valueMatching.positive.concat(valueMatching.negative);
        const attributesLeft = attributes.slice(0);
        attributesLeft.splice(index, 1);

        if (eventsLeft.length === 0 || attributesLeft.length === 0)
          node.add(value, null);
        else
          node.add(value, this.train(eventsLeft, attributesLeft));
      }
    }

    return node.cleared;
  }

  classify (event, node=this.root)
  {
    const result = node.test(event);

    if (result instanceof Node)
      return this.classify(event, result);
    else
      return result;
  }
  
  _getBestAttribute (events, attributes)
  {
    let best = { matching: null, index: -1 };
    let bestCount;

    attributes.forEach((attribute, index) => {
      const matching = new AttributeMatching(attribute);
      events.forEach(matching.add.bind(matching));

      const count = matching.count();

      if (!bestCount || count.exclusive > bestCount.exclusive)
      {
        bestCount = count;
        
        best.matching = matching;
        best.index = index;
      }
    });

    return best;
  }
}


class Node
{
  constructor (attribute)
  {
    this.attribute = attribute;
    this.next = {};
  }

  add (value, next)
  {
    if (this.attribute.values.indexOf(value) === -1)
      throw new TypeError('The value is not a value of the node attribute');

    else if (next === null || typeof next === 'boolean' || next instanceof Node)
      this.next[value] = next;
    
    else
      throw new TypeError('The next value should null, a Node or a boolean result');
  }

  get cleared ()
  {
    this.attribute = this.attribute.name;
    return this;
  }

  test (event) {
    return this.next[event.getValue(this.attribute)];
  }
}

class Attribute
{
  constructor (name, values)
  {
    this.name = name;
    this.values = values;
  }
}

class AttributeMatching
{
  constructor (attribute)
  {
    this.attribute = attribute;
    this.values = {};

    this.attribute.values.forEach(value => this.values[value] = new ValueMatching());
  }

  add (event)
  {
    const value = event.getValue(this.attribute.name);

    if (this.values[value] === undefined)
      throw new TypeError('Answer ' + answer + ' is not valid');
    
    this.values[value].add(event);
  }

  count ()
  {
    const count = {
      exclusive: 0,
      mixed: 0
    };

    for (let value in this.values)
    {
      const valueMatching = this.values[value];

      if (valueMatching.isExclusive())
        count.exclusive += valueMatching.count();
      else
        count.mixed += valueMatching.count();
    }

    return count;
  }
}

class ValueMatching
{
  constructor ()
  {
    this.positive = [];
    this.negative = [];
  }

  add (event)
  {
    if (event.result) this.positive.push(event);
    else this.negative.push(event);
  }

  isExclusive () {
    return this.positive.length === 0 || this.negative.length === 0;
  }
  
  count () {
    return this.positive.length + this.negative.length;
  }

  getExclusiveResult ()
  {
    if (!this.isExclusive())
      throw new TypeError('Not an exclusive value matching');
    
    return this.positive.length > 0;
  }
}


BinaryDecisionTree.Node = Node;
BinaryDecisionTree.Attribute = Attribute;
BinaryDecisionTree.AttributeMatching = AttributeMatching;
BinaryDecisionTree.ValueMatching = ValueMatching;


module.exports = BinaryDecisionTree;