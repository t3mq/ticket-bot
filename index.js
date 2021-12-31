const {Client, Collection, Intents} = require('discord.js');
const {readdirSync } = require('fs')
const client = new Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
    restTimeOffset: 0,
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});

const { token } = require('./config.json');

client.login(token);
client.commands = new Collection();

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Commandes Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const commandFiles = readdirSync('./command').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./command/${file}`);
	client.commands.set(command.name, command);
	}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Event Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute( client, ...args));
	}
}
