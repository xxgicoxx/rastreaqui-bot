class MessageService {
  async handle($) {
    try {
      const message = 'Command not found';

      $.sendMessage(message);
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async help($) {
    try {
      const message = 'I can help you track Correios objects.\n\nYou can control me by sending these commands:\n\n/add {code} {name} - add object\n/remove {code} - remove object\n/check {code} - check object\n/list - list objects\n/help - command list';

      $.sendMessage(message);
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }
}

module.exports = MessageService;
