const { telegramConfig } = require('../configs');

const {
  HelpService,
  ObjectService,
} = require('../services');

const helpService = new HelpService();
const objectService = new ObjectService();

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  async handle() {
    try {
      this.bot.on('message', async ($) => {
        const command = $.text ? $.text.replace(telegramConfig.username, '') : $.text;

        switch (command) {
          case '/list':
            objectService.list(this.bot, $.chat, $.from);
            break;
          case '/help':
            helpService.help(this.bot, $.chat);
            break;
          default:
            break;
        }
      });

      this.bot.onText(/\/add (.+)/, async ($, match) => {
        const params = match[1].split(' ');
        objectService.add(this.bot, $.chat, $.from, params);
      });

      this.bot.onText(/\/remove (.+)/, async ($, match) => {
        const code = match[1];
        objectService.remove(this.bot, $.chat, $.from, code);
      });

      this.bot.onText(/\/check (.+)/, async ($, match) => {
        const code = match[1];
        objectService.check(this.bot, $.chat, code);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async job(bot) {
    try {
      objectService.changes(bot);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = BotController;
