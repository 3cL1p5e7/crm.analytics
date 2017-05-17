export const event = {
  scheme: {
    id: {
      type: 'String',
      required: true,
      hidden: true
    },
    title: {
      type: 'String',
      required: true,
      default: () => ''
    },
    description: {
      type: 'String',
      default: () => ''
    },
    color: {
      type: 'String',
      default: () => '#00CC99'
    },
    avatar: {
      type: 'String',
      default: () => null
    },
    from: {
      type: 'Date',
      default: () => new Date(Date.now())
    },
    to: {
      type: 'Date',
      default: () => new Date(Date.now() + 86400000) // +1 day
    },
    location: {
      type: 'location',
      default: () => null
    },
    master: {
      type: 'String',
      required: true
    },
    participants: {
      type: '[String]',
      default: () => { return []; }
    },
    parent: {
      type: 'String',
      default: () => null
    },
    children: {
      type: '[String]',
      default: () => { return []; }
    }
  }
};

export const location = {
  scheme: {
    id: {
      type: 'String',
      required: true,
      hidden: true
    },
    title: {
      type: 'String',
      required: true,
      default: () => ''
    },
    coordinates: {
      type: 'coordinate',
      default: () => null
    }
  }
};

export const coordinate = {
  scheme: {
    lat: {
      type: 'Number',
      default: () => 55.751244
    },
    lng: {
      type: 'Number',
      default: () => 37.618423
    }
  }
};