const { TelegramBaseController } = require('telegram-node-bot');

const { ObjectService } = require('../services');

const objectService = new ObjectService();

class ObjectController extends TelegramBaseController {
  async check($) {
    objectService.check($);
  }

  async remove($) {
    objectService.remove($);
  }

  async add($) {
    objectService.add($);
  }

  async list($) {
    objectService.list($);
  }

  async checkChanges($) {
    objectService.checkChanges($);
  }

  get routes() {
    return {
      check: 'check',
      add: 'add',
      remove: 'remove',
      list: 'list',
    };
  }
}

module.exports = ObjectController;
