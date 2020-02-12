const correios = require('correios.js');

const { Object } = require('../models');

class objectService {
  async check($) {
    try {
      const code = $.message.text.replace('/check', '').trim();

      if (!code) {
        $.sendMessage('Code must not be empty');
      } else {
        const object = await correios.track(code);

        if (!object || object.events.length <= 0) {
          $.sendMessage('Object events empty');
        } else {
          let message = '';

          object.events.forEach((e) => {
            message += `${e.date} - ${e.hour}\n`;
            message += `${e.location}\n`;
            message += `${e.event}\n`;
            message += `${e.message}\n\n`;
          });

          $.sendMessage(message);
        }
      }
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async add($) {
    try {
      const params = $.message.text.replace('/add', '').trim().split(' ');

      if (!params || params.length <= 0 || !params[0] || !params[0].trim()) {
        $.sendMessage('Code must not be empty');
      } else {
        const code = params[0].trim();
        const name = params[1] || null;
        const user = $.message.from.id;

        const object = await Object.findOne({ where: { user, code } });

        if (object) {
          await object.update({ name });

          $.sendMessage('Object already exists, just updated');
        } else {
          await Object.create({ name, user, code });

          $.sendMessage('Success, object added');
        }
      }
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async remove($) {
    try {
      const user = $.message.from.id;
      const code = $.message.text.replace('/remove', '').trim();

      if (!code) {
        $.sendMessage('Code must not be empty');
      } else {
        const object = await Object.findOne({ where: { user, code } });

        if (!object) {
          $.sendMessage('Object not found');
        } else {
          object.destroy();

          $.sendMessage('Success, object removed');
        }
      }
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async list($) {
    try {
      const objects = await Object.findAll({ where: { user: $.message.from.id } });

      if (!objects || objects.length <= 0) {
        $.sendMessage('No objects to list');
      } else {
        let message = '';

        objects.forEach((e) => {
          message += `${e.dataValues.code}${e.dataValues.name != null ? (` - ${e.dataValues.name}`) : ''}\n`;
        });

        $.sendMessage(message);
      }
    } catch (ex) {
      console.error(ex);

      $.sendMessage('Error, try again later');
    }
  }

  async checkChanges($) {
    try {
      const objects = await Object.findAll();

      let track;
      let event;

      objects.forEach(async (object) => {
        track = await correios.track(object.code);
        event = !track ? null : track.events[0];

        if (object.events !== track.events.length) {
          object.update({ events: track.events.length });

          $.sendMessage(object.user, `Object ${track.code}${object.name != null ? (` - ${object.name}`) : ''} changed\n\n${event.date} ${event.hour}\n${event.location}\n${event.event}\n${event.message}\n`);
        }
      });
    } catch (ex) {
      console.error(ex);
    }
  }
}


module.exports = objectService;
