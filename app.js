const { TextCommand, Telegram } = require('telegram-node-bot');

const { ObjectController, MessageController } = require('./app/controllers');
const { Correios } = require('./app/workers/cron-jobs/correios');

const { telegramConfig } = require('./app/configs');

const bot = new Telegram(telegramConfig.token, {
  webAdmin: {
    port: 7770,
    host: 'localhost',
  },
  workers: 1,
});

const correios = new Correios(bot.api);

bot.router
  .when(new TextCommand('/start', 'start'), new MessageController())
  .when(new TextCommand('/help', 'help'), new MessageController())
  .when(new TextCommand('/check', 'check'), new ObjectController())
  .when(new TextCommand('/add', 'add'), new ObjectController())
  .when(new TextCommand('/remove', 'remove'), new ObjectController())
  .when(new TextCommand('/list', 'list'), new ObjectController())
  .otherwise(new MessageController());

correios.start();
