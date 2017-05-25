import * as providers from 'plugins/auth.providers/';

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
      default: () => '',
      map: {
        [providers.Google._name]: 'summary',
        [providers.Vk._name]: null,
        [providers.Facebook._name]: null
      }
    },
    description: {
      type: 'String',
      default: () => ''
    },
    status: {
      type: 'String',
      default: () => ''
    },
    colorId: {
      type: 'String',
      default: () => '10'
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
      default: () => new Date(Date.now()),
      map: {
        [providers.Google._name]: 'start.dateTime',
        [providers.Vk._name]: null,
        [providers.Facebook._name]: null
      }
    },
    to: {
      type: 'Date',
      default: () => new Date(Date.now() + 86400000), // +1 day
      map: {
        [providers.Google._name]: 'end.dateTime',
        [providers.Vk._name]: null,
        [providers.Facebook._name]: null
      }
    },
    location: {
      type: 'String',
      default: () => null,
      map: {
        [providers.Google._name]: 'location',
        [providers.Vk._name]: null,
        [providers.Facebook._name]: null
      }
    },
    master: {
      type: 'String',
      required: true,
      map: {
        [providers.Google._name]: 'organizer.email',
        [providers.Vk._name]: null,
        [providers.Facebook._name]: null
      }
    },
    participants: {
      type: '[participant]',
      default: () => { return []; },
      map: {
        [providers.Google._name]: 'attendees',
        [providers.Vk._name]: null,
        [providers.Facebook._name]: null
      }
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

// export const location = {
//   scheme: {
//     id: {
//       type: 'String',
//       required: true,
//       hidden: true
//     },
//     title: {
//       type: 'String',
//       required: true,
//       default: () => ''
//     },
//     coordinates: {
//       type: 'coordinate',
//       default: () => null
//     }
//   }
// };

// export const coordinate = {
//   scheme: {
//     lat: {
//       type: 'Number',
//       default: () => 55.751244
//     },
//     lng: {
//       type: 'Number',
//       default: () => 37.618423
//     }
//   }
// };

export const participant = {
  scheme: {
    email: {
      type: 'String',
      required: true,
      default: () => '',
      map: {
        [providers.Google._name]: 'email',
        [providers.Vk._name]: null,
        [providers.Facebook._name]: null
      }
    }
  }
}