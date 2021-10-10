const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

//---[ Emoji ]---\\
const EmojiAPI = require("../emojis")
const emojis = EmojiAPI;
//---[ Emoji ]---\\

//---[ UpdateNotes ]---\\
const UpdateAPI = require("../database/updates")
const updates = UpdateAPI;
//---[ UpdateNotes ]---\\

exports.run = async (client, message, args) => {
  
  const u = new MessageEmbed()
   .setTitle("SkyLegend - Güncelleme Notları")
   .setDescription(`
   
   ${client.emojis.cache.get(emojis.WinSuccess)} \`Güncel Sürüm:\` **${updates.latestversion}**
   
   **${updates.v100.v100.name}** - Güncelleme Notları
   
   ${client.emojis.cache.get(emojis.update)} **${updates.v100.v100.update}**
   ${client.emojis.cache.get(emojis.update)} **${updates.v100.v100.update2}**
   
   `)
  
  return message.channel.send(u)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["güncellemeler"]
}

exports.help = {
  name: 'updates',
  description: 'Kinda Code & Only V12',
  usage: 'updates'
}