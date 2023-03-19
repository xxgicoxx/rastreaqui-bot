module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('commands', [
    { command: '/add <b>{code}</b> <b>{name}</b>', description: 'Add object' },
    { command: '/remove <b>{code}</b>', description: 'Remove object' },
    { command: '/check <b>{code}</b>', description: 'Check object' },
    { command: '/list', description: 'List objects' },
    { command: '/help', description: 'Help' },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('commands', null, {}),
};
