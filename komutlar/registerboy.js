const Discord = require("discord.js");
const { JsonDatabase } = require("wio.db")
const db = new JsonDatabase({ databasePath:"./database.json" });

//---[ Databases ]---\\
const webapi = require("../database/webhooks")
const reg = require("../database/register")
//---[ Databases ]---\\

//---[ Import API ]---\\
const api = new Discord.WebhookClient(webapi.WebhookHost.WebhookThree.ID, webapi.WebhookHost.WebhookThree.TOKEN)
//---[ Import API ]---\\

exports.run = async (client, message, args) => {
  
  const kayıtkanalı = reg.ChannelHost.RegisterChannel
  
  if(kayıtkanalı == null) return message.channel.send('');
  if(message.channel.id !== kayıtkanalı) return message.channel.send(`Sadece Kayıt Kanalından Kayıt Edebilirsiniz!`);
  
  if(!message.member.hasPermission(reg.RoleHost.Admin)) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
  } else {
    let member = message.mentions.users.first() || client.users.cache.get(args.join(" "))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const user = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("Bir isim girin.")
      if(!yas) return message.channel.send("Bir yaş girin.")
    setTimeout(function() {
      user.roles.add(reg.RoleHost.Boy)
    }, 3000)
    
    setTimeout(function() {
      user.roles.add(reg.RoleHost.Member)
    }, 3000)
    
    setTimeout(function() { 
      user.roles.remove(reg.RoleHost.Unregistered)
    }, 4000)
    
    user.setNickname(`${nick} ${yas}`)
    
    const embed = new Discord.MessageEmbed()
    .setTitle("Hmm, Kayıt İşlemi Gerçekleşti! (Erkek)")
    .setDescription(`
    
    \`Kullanıcı:\` ${user} \`(${user.id})\`
    
    \`Eski Adı:\` **${member.user.username}**
    \`Yeni Adı:\` **${nick} ${yas}**
    
    \`Yetkili:\` ${message.author}
    
    `)

    .setFooter("SkyLegend | Kayıt Sistemi")
    .setColor("GREEN")
    
    db.add(`StatsBoy_${message.author.id}.${message.guild.id}`, 1)
    
    api.send(embed)
    return message.channel.send(`${message.author} Kayıt İşlemi Başarılı!`)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "",
  usage: "erkek @etiket"
};
   