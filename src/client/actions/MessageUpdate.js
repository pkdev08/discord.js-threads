'use strict';

const Action = require('./Action');

const channelTypes = ['text', 'news', 'dm'];

class MessageUpdateAction extends Action {
  handle(data) {
    const channel = this.getChannel(data);
    if (!channelTypes.includes(channel.type)) return {};
    
    if (channel) {
      const { id, channel_id, guild_id, author, timestamp, type } = data;
      const message = this.getMessage({ id, channel_id, guild_id, author, timestamp, type }, channel);
      if (message) {
        const old = message._update(data, true);
        return {
          old,
          updated: message,
        };
      }
    }

    return {};
  }
}

module.exports = MessageUpdateAction;
