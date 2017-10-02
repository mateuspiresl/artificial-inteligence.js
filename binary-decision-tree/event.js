class Event
{
  constructor (result)
  {
    this.result = result;
    this.attributes = {};
  }

  setValue (attributeName, value) {
    this.attributes[attributeName] = value;
    return this;
  }

  getValue (attributeName)
  {
    if (this.attributes[attributeName] === undefined)
      throw new Error('The event does not have the attribute ' + attributeName);
    
    return this.attributes[attributeName];
  }
}


module.exports = Event;