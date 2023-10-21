const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,StringSelectMenuBuilder,ActivityType } = require("discord.js");
const moment = require("moment")
require('moment-duration-format');
const ares_config = require("../../../ares_config.json")
module.exports = {
name: "oda-panel",
aliases: ["panel"],
execute: async (client, message, args, ares_embed) => {     

    const aresbutton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('oda-oluştur')
            .setLabel(`Özel Oda Oluştur`)
            .setStyle('Success'))

message.channel.send({content:`**${message.guild.name}** Sunucusunun Özel Oda sistemine hoşgeldin.

Aşağıdaki butonlar yardımıyla yeni bir özel oda oluşturabilirsin.
\`[ Adınıza açılan sohbet kanalından özel ayarlar paneline ulabilirsiniz. ]\``,components:[aresbutton]})
message.delete();



}}