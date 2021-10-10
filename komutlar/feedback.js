const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const { JsonDatabase } = require("wio.db");
const emojis = require("../emojis")
const db = new JsonDatabase({ databasePath: "./database.json" });
const webhookapi = require("../database/webhooks")
let webapi = new Discord.WebhookClient(webhookapi.WebhookHost.WebhookOne.ID, webhookapi.WebhookHost.WebhookOne.TOKEN)
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => {
  
    const full = db.get(`SuggestID`)
    const ID = args[1]
    
    let tür = args[0]
    let feedback = args.slice(1).join(" ")
    if(!tür) return message.channel.send('Tür Girmediniz!! \`[Öneri - Hata\`] ')
    if(!feedback) return message.channel.send('Feedback girin')
    if(args[0].toLowerCase() !== "öneri" && args[0].toLowerCase() !== "hata" && args[0].toLowerCase() !== "onayla" && args[0].toLowerCase() !== "sunucu") { return message.channel.send('Doğru Tür Girmediniz!! \`[Öneri - Hata / Sunucu]\` ') }
    
  let success = new Discord.MessageEmbed()
   .setTitle(`${client.emojis.cache.get(emojis.WindowsEmojis.WinSuccess)} ${tür} Başarıyla Gönderildi!`)
   .setDescription(`${feedback}`)
 
  if(args[0].toLowerCase() == "öneri" || args[0].toLowerCase() == "hata") {
  const GlobalEmbed = new Discord.MessageEmbed()
  .setTitle(`${client.emojis.cache.get(emojis.update)} Hmm, Yeni Bir Feedback Geldi!`)
  .setDescription(`
  
  ${client.emojis.cache.get(emojis.infinity)} \`Feedback Gönderen:\` **${message.author.username} (${message.author.id})**
  ${client.emojis.cache.get(emojis.infinity)} \`Feedback Sunucusu:\` **${message.guild.name}**
  
  ${client.emojis.cache.get(emojis.pin)} \`Feedback Türü:\` **${tür}**
  ${client.emojis.cache.get(emojis.pin)} \`Feedback:\` **${feedback}**
  
  ${client.emojis.cache.get(emojis.WindowsEmojis.WinWarning)} \`Durum:\` **Bekleniyor**
  
  `)
  
  client.channels.cache.get("884060522536919060").send(GlobalEmbed).then(async (m) => {
    m.react("✅")
    m.react("❌")
  })
  
  return message.channel.send(success)
  };
  
  if(args[0].toLowerCase() == "sunucu") {
    if(message.guild.id !== "870265878653067335") return message.channel.send(" \`Hata:\` Bu Seçenek Sadece **[SkyLegend](https://discord.gg/ddpzPG3r8R)** Sunucusuna Aittir!")
    const ServerEmbed = new Discord.MessageEmbed()
  .setTitle(`${client.emojis.cache.get(emojis.update)} Hmm, Yeni Bir İstek Geldi!`)
  .setDescription(`
  
  ${client.emojis.cache.get(emojis.infinity)} \`Feedback Gönderen:\` **${message.author.username} (${message.author.id})**
  ${client.emojis.cache.get(emojis.infinity)} \`Feedback Sunucusu:\` **${message.guild.name}**
  
  ${client.emojis.cache.get(emojis.pin)} \`Feedback Türü:\` **${tür}**
  ${client.emojis.cache.get(emojis.pin)} \`Feedback:\` **${feedback}**
  
  ${client.emojis.cache.get(emojis.WindowsEmojis.WinLoading)} \`Durum:\` **Bekleniyor**
  
  `)
  
  client.channels.cache.get("884060522536919060").send(ServerEmbed).then(async (m) => {
    m.react("✅")
    m.react("❌")
  })
    
  return message.channel.send(success)
  }
  
  if(args[0].toLowerCase() == "onayla") {
    if(message.author.id !== "744835491643260988") return;

  let onayembed = new Discord.MessageEmbed()
    .setTitle(`${client.emojis.cache.get(emojis.update)} Hmm, Yeni Bir İstek Geldi!`)
    .setDescription(`
  
  ${client.emojis.cache.get(emojis.infinity)} \`Feedback Gönderen:\` **${message.author.username} (${message.author.id})**
  ${client.emojis.cache.get(emojis.infinity)} \`Feedback Sunucusu:\` **${message.guild.name}**
  
  ${client.emojis.cache.get(emojis.pin)} \`Feedback Türü:\` **${tür}**
  ${client.emojis.cache.get(emojis.pin)} \`Feedback:\` **${feedback}**
  
  ${client.emojis.cache.get(emojis.WindowsEmojis.WinSuccess)} \`Durum:\` **Kabul Edildi**
  `)
  
  client.channels.cache.get("884060522536919060").messages.fetch(ID).then(async (i) => {
     i.edit(onayembed)
   })
    }
};
// 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["geribildirim"],
    permLevel: 0
}

exports.help = {
    name: 'feedback',
    description: 'Botta bulduğunuz hatayı belirtilen kanala bildirir.',
    usage: 'hata'
}