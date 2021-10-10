const Discord = require('discord.js')
const emojis = require("../emojis")
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./database.json" });

exports.run = async (client, message, args) => {
  
  let i = db.get(`UpdateType_${message.author.id}`)
  
  const channeltype = args[0]
  
  if(db.includes(message.author.id)) return message.channel.send(` ${client.emojis.cache.get(emojis.WindowsEmojis.WinError)} \`Hata:\` Sanırım Önceden **${i}** Kanalına Katılmıştınız!`)
  if(!args[0]) return message.channel.send(`${client.emojis.cache.get(emojis.WindowsEmojis.WinError)} \`Hata:\` Bir Kanal Girmeyi Unuttunuz! \`[Dev - Beta - Release Preview]\` `)
  if(args[0].toLowerCase().includes("Dev")) { 
    const i = await message.channel.send(` ${client.emojis.cache.get(emojis.WindowsEmojis.WinLoading)} \`İşleniyor:\` Bekleyin! Kurulumuzu Tamamlıyoruz...`)
    
    setInterval(() => { 
    i.edit(` ${client.emojis.cache.get(emojis.WindowsEmojis.WinSuccess)} \`Başarılı:\` Kurulumunuzu Tamamladık! Artık **${channeltype}** Kanalına Katıldınız!`)
   
  }, 6500)
    
  db.set(`UpdateType_${message.author.id}`, channeltype)
    
 }
  
  if(args[0].toLowerCase().includes("Beta")) { 
    const i = await message.channel.send(` ${client.emojis.cache.get(emojis.WindowsEmojis.WinLoading)} \`İşleniyor:\` Bekleyin! Kurulumuzu Tamamlıyoruz...`)
    
    setInterval(() => { 
    i.edit(` ${client.emojis.cache.get(emojis.WindowsEmojis.WinSuccess)} \`Başarılı:\` Kurulumunuzu Tamamladık! Artık **${channeltype}** Kanalına Katıldınız!`)
   
  }, 6500)
    
  db.set(`UpdateType_${message.author.id}`, channeltype)
    
 }
    if(args[0].toLowerCase().includes("Release Preview")) { 
    const i = await message.channel.send(` ${client.emojis.cache.get(emojis.WindowsEmojis.WinLoading)} \`İşleniyor:\` Bekleyin! Kurulumuzu Tamamlıyoruz...`)
    
    setInterval(() => { 
    i.edit(` ${client.emojis.cache.get(emojis.WindowsEmojis.WinSuccess)} \`Başarılı:\` Kurulumunuzu Tamamladık! Artık **${channeltype}** Kanalına Katıldınız!`)
   
  }, 6500)
    
  db.set(`UpdateType_${message.author.id}`, channeltype)
      
 }

  
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
  
};
  
exports.help = {
name: "join",
description: 'Botta bulduğunuz hatayı belirtilen kanala bildirir.',
usage: 'hata'
};