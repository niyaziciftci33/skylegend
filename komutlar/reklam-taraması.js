const Discord = require('discord.js')
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./database.json" });
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu Komutu Kullanabilmek İçin **Mesajları Yönet** İznine Sahip Olmalısın!`);
  
	const members = message.guild.members.cache.filter(member => member.user.presence.game && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.presence.game.name));
	const memberss = message.guild.members.cache.filter(member => member.user.username && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.username));
	
  const embed = new Discord.MessageEmbed()
  
  .addField("Oynuyor Mesajı Reklam İçeren Kullanıcılar :", members.map(member => `${member} = ${member.user.presence.game.name}`).join("\n") || "Kimsenin Oynuyor Mesajı Reklam İçermiyor.")
	.addField("Kullanıcı Adı Reklam İçeren Kullanıcılar :", memberss.map(member => `${member} = ${member.user.username}`).join("\n") || "Kimsenin Kullanıcı Adı Reklam İçermiyor.")
	.setColor("GREEN")
	
  message.channel.send({embed})
  }

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['reklam-ara', 'reklamara', 'reklamtaraması'],
	permLevel: 2
}

exports.help = {
	name: 'reklam-taraması',
	description: 'Kinda Code & Only V12.',
	usage: 'reklam-taraması',
 
}
