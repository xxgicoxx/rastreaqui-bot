const correios = require('correios.js');

const { Object } = require('../models');

class objectService {
  async check(bot, chat, code) {
    try {
      if (!code) {
        await bot.sendMessage(chat.id, 'Code must not be empty');
      } else {
        const track = await correios.track(code);

        if (!track || track.events.length <= 0) {
          await bot.sendMessage(chat.id, 'Object events empty');
        } else {
          let message = '';

          track.events.forEach((event) => {
            message += `<b>Date:</b> ${event.date} - ${event.hour}\n`;
            message += `<b>Location:</b> ${event.location}\n`;
            message += `<b>Event:</b> ${event.event}\n`;
            message += `<b>Message:</b> ${event.message}\n\n`;
          });

          await bot.sendMessage(chat.id, message, { parse_mode: 'html' });
        }
      }
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, 'Error, try again later');
    }
  }

  async add(bot, chat, from, params) {
    try {
      if (!params || params.length <= 0 || !params[0] || !params[0].trim()) {
        await bot.sendMessage(chat.id, 'Code must not be empty');
      } else {
        const code = params[0].trim();
        const name = params.length > 1 && params[1] !== null && params[1].trim() !== '' && params.shift().length > 0 ? params.join(' ') : null;
        const user = from.id;

        if (name !== null && name.length > 120) {
          await bot.sendMessage(chat.id, 'Name is too long');
        } else {
          const track = await correios.track(code);
          const object = await Object.findOne({ where: { user, code } });

          if (object) {
            await object.update({
              name,
              events: track != null && track.events != null ? track.events.length : 0,
            });

            await bot.sendMessage(chat.id, 'Object already exists, just updated');
          } else {
            await Object.create({
              name,
              user,
              code,
              events: track != null && track.events != null ? track.events.length : 0,
            });

            await bot.sendMessage(chat.id, 'Success, object added');
          }
        }
      }
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, 'Error, try again later');
    }
  }

  async remove(bot, chat, from, code) {
    try {
      const user = from.id;

      if (!code) {
        await bot.sendMessage(chat.id, 'Code must not be empty');
      } else {
        const object = await Object.findOne({ where: { user, code } });

        if (!object) {
          await bot.sendMessage(chat.id, 'Object not found');
        } else {
          object.destroy();

          await bot.sendMessage(chat.id, 'Success, object removed');
        }
      }
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, 'Error, try again later');
    }
  }

  async list(bot, chat, from) {
    try {
      const objects = await Object.findAll({ where: { user: from.id } });

      if (!objects || objects.length <= 0) {
        await bot.sendMessage(chat.id, 'No objects to list');
      } else {
        let message = '';

        objects.forEach((e) => {
          message += `${e.dataValues.code}${e.dataValues.name != null ? (` - ${e.dataValues.name}`) : ''}\n`;
        });

        await bot.sendMessage(chat.id, message);
      }
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, 'Error, try again later');
    }
  }

  async changes(bot) {
    try {
      const objects = await Object.findAll();

      let event;

      await Promise.all(objects.map((object) => correios.track(object.code).then((track) => {
        event = !track ? null : track.events[0];

        if (object.events !== track.events.length) {
          object.update({ events: track.events.length });

          bot.sendMessage(object.user, `${track.code}${object.name != null ? (` - ${object.name}`) : ''}\n\n${event.date} ${event.hour}\n${event.location}\n${event.event}\n${event.message}\n`);
        }
      })));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = objectService;
