const ayarlar = require('../ayarlar.json');
let talkedRecently = new Set();

const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./database.json" });

module.exports = async (message) => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
    setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if(message.author.bot) return;
  if(!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if(client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if(client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if(cmd) {
    if(perms < cmd.conf.permLevel) return;
    if(cmd.conf.developerOnly == true && message.user.id !== "744835491643260988") return message.channel.send(`Command can only be used by developer.`);

    cmd.run(client, message, params, perms).catch(async (err) => client.channels.cache.get(message.channel.id).send(err.toString()))
  }

};