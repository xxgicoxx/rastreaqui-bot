module.exports = Object.freeze({
  MESSAGE_HELP: '<b>I can help you track Correios objects.\n\nYou can control me by sending these commands:\n\n</b>',
  MESSAGE_ERROR_TRY_AGAIN: 'Error, try again later',
  MESSAGE_CODE_MUST_NOT_BE_EMPTY: 'Code must not be empty',
  MESSAGE_NAME_IS_TOO_LONG: 'Name is too long',
  MESSAGE_OBJECT_ALREADY_EXISTS: 'Object already exists, just updated',
  MESSAGE_OBJECT_ADDED: 'Object added',
  MESSAGE_OBJECT_EVENTS_EMPTY: 'Object events empty',
  MESSAGE_OBJECT_NOT_FOUND: 'Object not found',
  MESSAGE_OBJECT_REMOVED: 'Object removed',
  MESSAGE_OBJECT_LIST_ARE_EMPTY: 'Object list are empty',

  COMMAND_LIST: '/list',
  COMMAND_COMMANDS: '/commands',
  COMMAND_HELP: '/help',

  COMMAND_ADD_REGEX: /\/add (.+)/,
  COMMAND_REMOVE_REGEX: /\/remove (.+)/,
  COMMAND_CHECK_REGEX: /\/check (.+)/,

  ON_MESSAGE: 'message',

  CRON: '*/5 * * * *',

  PARSE_MODE: 'html',
});
