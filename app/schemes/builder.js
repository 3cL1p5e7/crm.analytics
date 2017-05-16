import entities from './entities';
class Builder {
  _classes = {}
  tools = {
    escapes: {
      'Object': /{([\s\S]+?)}/g,
      'Array': /\[([\s\S]+?)\]/g
    }
  }
  constructor() {
    this._classes = entities;
  }

  get classes() {
    return this._classes;
  }

  addClasses(classes) {
    this._classes = { ...this._classes, ...classes };
  }

  build(className, payload, depth = 0) {
    if (depth > 1 || !payload)
      return;
    if (!this._classes[className]) {
      console.error(`Class with name ${className} does not exist`);
      return;
    }

    const instance = {};
    const fields = this._classes[className].scheme;
    Object.keys(fields).some((key) => {
      const field = fields[key];
      if (payload[key] === null || typeof payload[key] === 'undefined') {

        if (field.required) {
          console.error(`Required field ${key} does not present`);
          return true;
        }
        if (!field.default || typeof field.default !== 'function') {
          instance[key] = null;
        } else instance[key] = field.default.call(null);
        return false;
      }

      if (!field.type) {
        console.error(`Field's type ${key} not defined`);
        return true;
      }

      let entityName = false;
      let objectType = false;
      Object.keys(this.tools.escapes).some(type => {
        field.type.replace(this.tools.escapes[type], (match, dec) => {
          entityName = dec;
          objectType = type;
        })
      });
      if (!entityName) { // plain object 
        instance[key] = window[field.type](payload[key]);
      } else { // special object
        if (objectType === 'Array' && Array.isArray(payload[key])) {
          instance[key] = [];
          payload[key].forEach(index => {
            instance[key].push(this.build(entityName, payload[key][index], 1));
          });
        } else if (objectType === 'Object' && typeof payload[key] === 'object') {
          instance[key] = {};
          Object.keys(payload[key]).forEach(objKey => {
            instance[key][objKey] = this.build(entityName, payload[key][objKey], 1);
          });
        }
      }
      return false;      
    });
    return instance;
  }
}

export default Builder;