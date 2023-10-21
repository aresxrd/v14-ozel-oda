const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,ChannelType,PermissionFlagsBits } = require("discord.js");
const ares_config = require("../../ares_config.json")
module.exports = async (oldares,newares) => {
    const aresbutton = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setEmoji('1165182160144187412')
    .setCustomId('user-ekle')
    .setLabel(`User Ekle`)
    .setStyle('Secondary'),
    new ButtonBuilder()
    .setEmoji('1165182156855848990')
    .setCustomId('user-cıkar')
    .setLabel(`User Çıkar`)
    .setStyle('Secondary'),
    new ButtonBuilder()
    .setEmoji('1165190593815789628')
    .setCustomId('oda-isim')
    .setLabel(`Oda Adı Değiştir`)
    .setStyle('Secondary'),
    new ButtonBuilder()
    .setEmoji('1165182151256444998')
    .setCustomId('oda-sil')
    .setLabel(`Özel Odanı Sil`)
    .setStyle('Secondary'))
    const aresbutton2 = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setEmoji('1165182149767467119')
            .setCustomId('oda-kilit')
            .setLabel(`Odayı Kilitle`)
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji('👥')
            .setCustomId('oda-limit')
            .setLabel(`Oda Limiti Değiştir`)
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji('1165190717136711773')
            .setCustomId('sesten-at')
            .setLabel(`Sesten At`)
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji('1165182146978254878')
            .setCustomId('oda-herkes')
            .setLabel(`Odayı Herkese Aç`)
            .setStyle('Secondary'))

            const aresbutton3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji('❓')
                    .setCustomId('oda-bilgi')
                    .setLabel(`Oda Bilgisi`)
                    .setStyle('Primary'))

let data = client.db.get(`özeloda_${newares.member.id}`)
if(newares.channelId == ares_config.odaOlusturID){
    if(!data){
    let odaisim = newares.member.displayName.length > 10 ? newares.member.displayName.substring(0, 10).trim() + ".." : newares.member.displayName;
    newares.guild.channels.create({
        name: `${odaisim}`,
        type: ChannelType.GuildVoice,
        parent: ares_config.kategoriID,
        userLimit: 1,
        permissionOverwrites: [{id: newares.member.id,
        allow: [PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak],
        deny: [PermissionFlagsBits.SendMessages]
        }, 
        {
        id: newares.guild.id,
        deny: [PermissionFlagsBits.SendMessages,PermissionFlagsBits.Connect,PermissionFlagsBits.ViewChannel, PermissionFlagsBits.MuteMembers, PermissionFlagsBits.DeafenMembers,PermissionFlagsBits.Stream,PermissionFlagsBits.Speak]
        }]
    }).then(async(ares) => { 

    await newares.member.voice.setChannel(ares.id)
    await client.db.set(`özeloda_${newares.member.id}`,ares.id)
    await client.db.set(`${ares.id}`,`${newares.member.id}`)
    await client.db.push(`members_${ares.id}`,newares.member.id)
    await client.channels.cache.find(x => x.name == `${odaisim}`).send({content:`<@${newares.member.id}> Selam, özel odanı bu butonlardan yönetebilirsin.`,components:[aresbutton,aresbutton2,aresbutton3]})
    })
    }else{
    let channel = newares.guild.channels.cache.get(data);
    if(!channel)return;
    newares.member.voice.setChannel(channel.id);
    }
}

}
module.exports.conf = {
name: "voiceStateUpdate"
}
