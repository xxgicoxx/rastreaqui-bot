module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('commands', [{
    command: '/add {code} {name}',
    description: 'Add object',
  }, {
    command: '/remove {code}',
    description: 'Remove object',
  }, {
    command: '/check {code}',
    description: 'Check object',
  }, {
    command: '/list',
    description: 'List objects',
  }, {
    command: '/help',
    description: 'Help',
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('commands', null, {}),
};
