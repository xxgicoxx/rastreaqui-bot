const cluster = require('cluster');
const cron = require('node-cron');

const { telegramConfig } = require('../configs');
const { constants } = require('../utils');

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
      this.bot.on(constants.ON_MESSAGE, async ($) => {
        const command = $.text ? $.text.replace(telegramConfig.username, '') : $.text;

        switch (command) {
          case constants.COMMAND_LIST:
            objectService.list(this.bot, $.chat, $.from);

            break;
          case constants.COMMAND_COMMANDS:
            helpService.help(this.bot, $.chat);

            break;
          case constants.COMMAND_HELP:
            helpService.help(this.bot, $.chat);

            break;
          default:
            break;
        }
      });

      this.bot.onText(constants.COMMAND_ADD_REGEX, async ($, match) => {
        const params = match[1].split(' ');

        objectService.add(this.bot, $.chat, $.from, params);
      });

      this.bot.onText(constants.COMMAND_REMOVE_REGEX, async ($, match) => {
        const code = match[1];

        objectService.remove(this.bot, $.chat, $.from, code);
      });

      this.bot.onText(constants.COMMAND_CHECK_REGEX, async ($, match) => {
        const code = match[1];

        objectService.check(this.bot, $.chat, code);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async jobs() {
    try {
      if (!cluster.isMaster) {
        return;
      }

      cron.schedule(constants.CRON, async () => {
        objectService.changes(this.bot);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = BotController;
