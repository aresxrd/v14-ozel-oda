const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,ChannelType,PermissionFlagsBits } = require("discord.js");
const ares_config = require("../../ares_config.json")
module.exports = async (oldares,newares) => {
if(!newares.channel)return;

let channel = client.guilds.cache.get(ares_config.sunucuID).channels.cache.get(newares.channelId);
if(channel.parentId == ares_config.kategoriID){
let data = client.db.get(`members_${newares.channel.id}`)
if(!data)return;
if(data.some(ares => ares.includes(newares.member.id)))return;
newares.member.voice.disconnect();
}else return

}
module.exports.conf = {
name: "voiceStateUpdate"
}
