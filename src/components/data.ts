export interface Contact {
  name: string,
  lastName: string,
  phoneNumber: string,
  avatar?: string,
}

export const getContacts = (): Contact[] => {
  return [{
      name: 'Catelyn',
      lastName: 'Tully',
      phoneNumber: '2345678',
    }, {
      name: 'Eddard',
      lastName: 'Stark',
      phoneNumber: '2345679',
    }, {
      name: 'Rickard',
      lastName: 'Stark',
      phoneNumber: '2345670',
    }, {
      name: 'Arya',
      lastName: 'Stark',
      phoneNumber: '2345690',
    }, {
      name: 'Kevan',
      lastName: 'Lanister',
      phoneNumber: '2345690',
    }, {
      name: 'Tywin',
      lastName: 'Lanister',
      phoneNumber: '2345690',
    },
  ];
}
