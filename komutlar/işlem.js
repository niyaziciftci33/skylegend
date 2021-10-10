const Discord = require('discord.js');

//---[ Emoji ]---\\
const EmojiAPI = require("../emojis")
const emojis = EmojiAPI;
//---[ Emoji ]---\\

//---[ Webhook ]---\\
const API = require("../database/webhooks")
//---[ Webhook ]---\\

//---[ API ]---\\
const webapi = API;
const api = new Discord.WebhookClient(webapi.WebhookHost.WebhookTwo.ID, webapi.WebhookHost.WebhookTwo.TOKEN);
//---[ API ]---\\

exports.run = async (client, message, args) => {
  
  let guild = message.guild
  let reason = args.slice(2).join(" ");
  let user = message.mentions.users.first() || client.users.cache.get(args[1])
  let admin = message.author
  
  if(args[0] !== "ban" && args[0] !== "kick") { return message.reply("Lütfen İşlem **Giriniz**! \`[Kick - Ban]\`") }
  if(args[0].toLowerCase() == "ban") {
  if(!user) return message.reply('Kimi banlayacağını yazmalısın.').catch(console.error);
  if(reason.length < 1) return message.reply('Ban sebebini yazmalısın.');
  guild.members.ban(user, { reason: reason })

  message.channel.send("Kullanıcı Başarıyla **Yasaklandı**")

  const embed = new Discord.MessageEmbed()
    .setTitle("Bir Kullanıcı \"Yasaklandı\" ")
    .setColor(0x000000)
    .setDescription(`
    
     ${client.emojis.cache.get(emojis.infinity)} **Kullanıcı Bilgileri** ${emojis.infinity}
     
     ${client.emojis.cache.get(emojis.pin)} \`Adı:\` ${user} **(${user.username}#${user.discriminator})**
     ${client.emojis.cache.get(emojis.pin)} \`ID:\` **${user.id}**
     
     ${client.emojis.cache.get(emojis.update)} \`Sebep:\` **${reason}**
          
          
     ${client.emojis.cache.get(emojis.care)} **Yetkili Bilgileri** ${emojis.care}
     
     ${client.emojis.cache.get(emojis.pin)} \`Adı:\` **${admin.username}#${admin.discriminator}*
     ${client.emojis.cache.get(emojis.pin)} \`ID:\` **${admin.id}**
     
    `)

return api.send(embed)
  }
  
  if(args[0].toLowerCase() == "kick") {
   
    
  if(!user) return message.reply("Hangi Üyeyi Atacaksın?").catch(console.error);
  if(reason.length < 1) return message.reply('kick sebebini yazmalısın.');
  guild.members.kick(user, { reason: reason }) 
    message.channel.send("Kullanıcı Başarıyla **Atıldı**")

  const embed = new Discord.MessageEmbed()
    .setTitle("Bir Kullanıcı \"Atıldı\" ")
    .setColor(0x000000)
    .setDescription(`
    
     ${client.emojis.cache.get(emojis.infinity)} **Kullanıcı Bilgileri** ${emojis.infinity}
     
     ${client.emojis.cache.get(emojis.pin)} \`Adı:\` ${user} **(${user.username}#${user.discriminator})**
     ${client.emojis.cache.get(emojis.pin)} \`ID:\` **${user.id}**
     
     ${client.emojis.cache.get(emojis.update)} \`Sebep:\` **${reason}**
          
          
     ${client.emojis.cache.get(emojis.care)} **Yetkili Bilgileri** ${emojis.care}
     
     ${client.emojis.cache.get(emojis.pin)} \`Adı:\` **${admin.username}#${admin.discriminator}*
     ${client.emojis.cache.get(emojis.pin)} \`ID:\` **${admin.id}**
    
    `)

return api.send(embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
};
exports.help = { 
	name: 'işlem', 
	description: 'Belirttiğiniz kişiyi sunucudan banlarsınız.', 
	usage: 'ban' 
}