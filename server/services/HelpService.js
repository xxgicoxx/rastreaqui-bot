const { Command } = require('../models');

class HelpService {
  async help(bot, chat) {
    try {
      let message = 'I can help you track Correios objects.\n\nYou can control me by sending these commands:\n\n';
      const commands = await Command.findAll();

      commands.forEach((command) => {
        message += `${command.dataValues.command} - ${command.dataValues.description}\n`;
      });

      await bot.sendMessage(chat.id, message, { parse_mode: 'html' });
    } catch (error) {
      console.error(error);

      await this.bot.sendMessage(this.id, 'Error, try again later');
    }
  }
}

module.exports = HelpService;
