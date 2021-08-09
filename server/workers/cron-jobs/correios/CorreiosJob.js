const cluster = require('cluster');
const cron = require('node-cron');

const { BotController } = require('../../../controllers');

const botController = new BotController();

class CorreiosJob {
  constructor(bot) {
    this.bot = bot;
  }

  start() {
    if (cluster.isMaster) {
      cron.schedule('*/5 * * * *', async () => {
        botController.job(this.bot);
      });
    }
  }
}

module.exports = CorreiosJob;
