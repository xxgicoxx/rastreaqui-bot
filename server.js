process.env.NTBA_FIX_319 = 1;

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const { telegramConfig } = require('./server/configs');
const { BotController } = require('./server/controllers');
const { CorreiosJob } = require('./server/workers/cron-jobs/correios');

const bot = new TelegramBot(telegramConfig.token, { polling: true });

const botController = new BotController(bot);
const correiosJob = new CorreiosJob(bot);

botController.handle();
correiosJob.start();
