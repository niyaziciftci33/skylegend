const Discord = require('discord.js')
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./database.json" });

exports.run = async(client, message, args) => {
  
if (!message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(`Bu Komutu Kullanabilmek İçin "\`Yönetici\`" Yetkisine Sahip Olmalısın.`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`codeminglog_${message.guild.id}`)
  
if (args[0] === "sıfırla" || args[0] === "kapat") {
  
if(!logkanal) return message.channel.sendEmbed(new Discord.MessageEmbed()
                                               
.setDescription(`Mod-Log kanalı zaten ayarlı değil!`)
.setColor("RED"));
    
db.delete(`codeminglog_${message.guild.id}`)
  
message.channel.sendEmbed(new Discord.MessageEmbed()
                          
.setDescription(`Mod-Log Kanalı başarıyla sıfırlandı.`)
.setColor("GREEN"));

return
}
  
if (!logk) return message.channel.sendEmbed(new Discord.MessageEmbed()
.setDescription(`Mod-Log kanalı belirt!`)
.setColor("RED"));
 

db.set(`codeminglog_${message.guild.id}`, logk.id)

message.channel.sendEmbed(new Discord.RichEmbed()
.setDescription(`Mod-Log kanalı başarıyla ${logk} olarak ayarlandı.`)
.setColor("GREEN"));

console.log(`Mod-log komutu ${message.author.username} Tarafından kullanıldı`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log'],
    permLevel: 0 
};

exports.help = {
    name: 'mod-log',
    description: 'Kinda Code & Only V12.',
    usage: 'mod-log'
};