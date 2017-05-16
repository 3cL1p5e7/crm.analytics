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
      type: 'Url',
      default: () => null
    },
    friends: {
      type: '{user}', // вложенность уровня 1 необходима
      default: () => { return {}; }
    },
    groups: {
      type: '{group}',
      default: () => { return {}; }
    },
    events: {
      type: '{event}',
      default: () => { return {}; }
    }
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
      type: 'Url',
      default: () => null
    },
    subscribers: {
      type: '{user}',
      default: () => { return {}; }
    }
  }
};