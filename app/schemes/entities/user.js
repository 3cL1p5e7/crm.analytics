export const user = {
  scheme: {
    id: {
      type: 'String',
      required: true,
      hidden: true
    },
    firstname: {
      type: 'String',
      default: () => ''
    },
    lastname: {
      type: 'String',
      default: () => ''
    },
    avatar: {
      type: 'String',
      default: () => null
    },
    friends: {
      type: '{user}', // вложенность уровня 1 необходима
      default: () => { return {}; }
    },
    groups: {
      type: '[String]',
      default: () => { return []; }
    },
    events: {
      type: '[String]',
      default: () => { return []; }
    },
  }
};

export const group = {
  scheme: {
    id: {
      type: 'String',
      required: true,
      hidden: true
    },
    name: {
      type: 'String',
      default: () => ''
    },
    avatar: {
      type: 'String',
      default: () => null
    },
    subscribers: {
      type: '[String]',
      default: () => { return []; }
    }
  }
};