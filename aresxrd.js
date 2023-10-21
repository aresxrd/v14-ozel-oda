const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client = new Client({fetchAllMembers: true,intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildBans,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildWebhooks,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.MessageContent],scopes:[OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,Partials.GuildMember, Partials.ThreadMember, Partials.GuildScheduledEvent],ws: {version: "10"}});
const ares_config = require("./ares_config.json")
const { readdir } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
const {JsonDatabase} = require("wio.db");
const db = client.db = new JsonDatabase({databasePath:"./ares_database.json"});
readdir("./src/ares_commands/", (err, files) => {if (err) console.error(err)
files.forEach(f => {readdir("./src/ares_commands/" + f, (err2, files2) => {
if (err2) console.log(err2)
files2.forEach(file => {let ares_prop = require(`./src/ares_commands/${f}/` + file);
console.log(`[ARESXRD KOMUT] ${ares_prop.name} Yüklendi!`);
commands.set(ares_prop.name, ares_prop);
ares_prop.aliases.forEach(alias => {aliases.set(alias, ares_prop.name);});});});});});
readdir("./src/ares_events", (err, files) => {
if (err) return console.error(err);
files.filter((file) => file.endsWith(".js")).forEach((file) => {let ares_prop = require(`./src/ares_events/${file}`);
if (!ares_prop.conf) return;
client.on(ares_prop.conf.name, ares_prop);
console.log(`[ARESXRD EVENT] ${ares_prop.conf.name} Yüklendi!`);});});
const commands2 = client.commands2 = (global.commands2 = []);
readdir("./komutlar_user/", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let props = require(`./komutlar_user/${file}`);
      client.commands2.push({name: props.name,type: props.type})
      console.log(`[ARESXRD] Menü Komut Yüklendi: ${props.name}`);
  });
});
client.on("ready", async () => {
    const rest = new REST({ version: "9" }).setToken(ares_config.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {body: client.commands2,});
  } catch (error) {
    console.error(error);
  }
});
client.on('interactionCreate', (button) => {
  if (button.isUserContextMenuCommand()){
      try {
        readdir("./komutlar_user/", (err, files) => {
          if (err) throw err;
          files.forEach(async (f) => {
            const command = require(`./komutlar_user/${f}`);
            if (
              button.commandName.toLowerCase() === command.name.toLowerCase()
            ) {
              return command.run(button);
            }
          });
        });
      } catch (err) {
        console.error(err);
      }}});
Collection.prototype.array = function() {return [...this.values()]}
client.login(ares_config.token).then(() => console.log(`[ARESXRD] Bot giriş yaptı!`)).catch((ares_err) => console.log(`[ARESXRD] Bot Giriş Yapamadı / Sebep: ${ares_err}`));

