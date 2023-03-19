const Correios = require('correios.js');
const { Object } = require('../models');
const { constants } = require('../utils');

const correios = new Correios();

class objectService {
  async add(bot, chat, from, params) {
    try {
      if (!params || params.length <= 0 || !params[0] || !params[0].trim()) {
        await bot.sendMessage(chat.id, constants.MESSAGE_CODE_MUST_NOT_BE_EMPTY);

        return;
      }

      const code = params[0].trim();
      const name = params.length > 1 && params[1] !== null && params[1].trim() !== '' && params.shift().length > 0 ? params.join(' ') : null;
      const user = from.id;

      if (name !== null && name.length > 120) {
        await bot.sendMessage(chat.id, constants.MESSAGE_NAME_IS_TOO_LONG);

        return;
      }

      const track = await correios.track(code);
      const object = await Object.findOne({ where: { user, code } });

      if (object) {
        await object.update({
          name,
          events: track != null && track.events != null ? track.events.length : 0,
        });

        await bot.sendMessage(chat.id, constants.MESSAGE_OBJECT_ALREADY_EXISTS);

        return;
      }

      await Object.create({
        name,
        user,
        code,
        events: track != null && track.events != null ? track.events.length : 0,
      });

      await bot.sendMessage(chat.id, constants.MESSAGE_OBJECT_ADDED);
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  async check(bot, chat, code) {
    try {
      if (!code) {
        await bot.sendMessage(chat.id, constants.MESSAGE_CODE_MUST_NOT_BE_EMPTY);

        return;
      }

      const track = await correios.track(code);

      if (!track || track.events.length <= 0) {
        await bot.sendMessage(chat.id, constants.MESSAGE_OBJECT_EVENTS_EMPTY);

        return;
      }

      let message = '';

      track.events.forEach((event) => {
        message += `<b>Date:</b> ${event.date} - ${event.hour}\n`;
        message += `<b>Event:</b> ${event.event}\n`;
        message += `<b>Location:</b> ${event.location || 'N/A'}\n`;
        message += `<b>Origin:</b> ${event.origin || 'N/A'}\n`;
        message += `<b>Destination:</b> ${event.destination || 'N/A'}\n\n`;
      });

      await bot.sendMessage(chat.id, message, { parse_mode: constants.PARSE_MODE });
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  async list(bot, chat, from) {
    try {
      const objects = await Object.findAll({ where: { user: from.id } });

      if (!objects || objects.length <= 0) {
        await bot.sendMessage(chat.id, constants.MESSAGE_OBJECT_LIST_ARE_EMPTY);

        return;
      }

      const message = objects.map((object) => `${object.dataValues.code}${object.dataValues.name != null ? (` - ${object.dataValues.name}`) : ''}`).join('\n');

      await bot.sendMessage(chat.id, message);
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  async remove(bot, chat, from, code) {
    try {
      const user = from.id;

      if (!code) {
        await bot.sendMessage(chat.id, constants.MESSAGE_CODE_MUST_NOT_BE_EMPTY);

        return;
      }

      const object = await Object.findOne({ where: { user, code } });

      if (!object) {
        await bot.sendMessage(chat.id, constants.MESSAGE_OBJECT_NOT_FOUND);

        return;
      }

      object.destroy();

      await bot.sendMessage(chat.id, constants.MESSAGE_OBJECT_REMOVED);
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  async changes(bot) {
    try {
      const objects = await Object.findAll();

      let event;

      await Promise.all(objects.map((object) => correios.track(object.code).then(async (track) => {
        event = !track ? null : track.events[0];

        if (object.events !== track.events.length) {
          let message = '';

          object.update({ events: track.events.length });

          message += `${track.code}${object.name != null ? (` - ${object.name}`) : ''}\n\n`;
          message += `<b>Date:</b> ${event.date} - ${event.hour}\n`;
          message += `<b>Event:</b> ${event.event}\n`;
          message += `<b>Location:</b> ${event.location || 'N/A'}\n`;
          message += `<b>Origin:</b> ${event.origin || 'N/A'}\n`;
          message += `<b>Destination:</b> ${event.destination || 'N/A'}\n\n`;

          bot.sendMessage(object.user, message, { parse_mode: constants.PARSE_MODE });
        }
      })));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = objectService;
