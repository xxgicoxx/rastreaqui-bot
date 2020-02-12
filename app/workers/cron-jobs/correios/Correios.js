const cluster = require('cluster');
const cron = require('node-cron');

const { ObjectController } = require('../../../controllers');

const objectController = new ObjectController();

class Correios {
  constructor($) {
    this.$ = $;
  }

  start() {
    if (cluster.isMaster) {
      cron.schedule('*/5 * * * *', async () => {
        objectController.checkChanges(this.$);
      });
    }
  }
}

module.exports = Correios;
