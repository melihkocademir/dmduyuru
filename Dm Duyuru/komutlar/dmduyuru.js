const Discord = require('discord.js-selfbot');

const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        
        return message.channel.send(` yetkin yok`).then(m => m.delete({ timeout: 8000 }))
    }
    let enAltYetkiliRolü = message.guild.roles.cache.get(ayarlar.mesajgidecekrol); 

    let yetkililer = message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= enAltYetkiliRolü.position && uye.presence.status !== "offline" && !uye.voice.channel).array();
    if (yetkililer.length == 0) return message.reply('başarısız');
    let mesaj = await message.channel.send(`evet yaz`);
    var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
    message.channel.awaitMessages(filter, { max: 1, timeout: 10000 }).then(collected => {
        let cevap = collected.first();
        if (cevap.content.toLowerCase().startsWith('hayır')) {
         
            return message.channel.send(` İşlem iptal edildi!`)
        }
        if (cevap.content.toLowerCase().startsWith('evet')) {
            yetkililer.forEach((yetkili, index) => {
             
                setTimeout(() => {
                    yetkili.send(ayarlar.mesaj);
                }, index * 1000);
            });
        };
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["duyuur"],
    permLevel: 0
};

exports.help = {
    name: 'duyuur',
    description: 'duyuur yapar.',
    usage: 'duyuur',
    kategori: 'duyuur'
};