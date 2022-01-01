# Ticket Bot

Ticket Bot is a discord ticket bot with buttons made with Discord.js v13

## How to install ?

You need to have Node.JS 16+
``````bash
git clone https://github.com/Xiaotoxdev/ticket-bot.git
cd ticket-bot
npm i
``````

## How to config ?

```json
//config.json
{
    "token": "TOKEN",
    "prefix": "PREFIX",
}
```

```bash
//You cant edit :
ID_ROLES (line 23)
ID_CATEGORIES (line 22)
```

```js
const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu }=require('discord.js')
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isSelectMenu()) return;
        
	const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('del')
                    .setPlaceholder('Selectionner pour supprimé le ticket !')
					.addOptions([
						{
							label: '🗑️ Delete the ticket',
							description: 'Delete the channel',
							value: 'delete',
						}
					])
                );
                
                
        let catégorie = "ID_CATEGORIES"
        let roleStaff = interaction.guild.roles.cache.get('ID_ROLES')

        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
        
        if(interaction.customId === "del") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
                channel.delete();
            }
        }

        if (interaction.customId == "select") {
            if (DejaUnChannel) return interaction.reply({content: '<:4247off:912015084035907665> You already have an open ticket on the server.', ephemeral: true})
            if (interaction.values[0] == "partner") {
                interaction.guild.channels.create(`ticket of ${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const partenariat = new MessageEmbed()
                    .setTitle('Ticket to apply for recruitment')
                    .setDescription('Please detail your application so that a server moderator will come to take charge.')
                    .setFooter('DevFr Support')
                    c.send({embeds: [partenariat], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `<:2003on:912015084405014558> Your ticket has been successfully opened. <#${c.id}>`, ephemeral: true})
                })
                
            } else if (interaction.values[0] == "complaint") {
                interaction.guild.channels.create(`ticket of ${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const plainte = new MessageEmbed()
                    .setTitle('Ticket to file a complaint')
                    .setDescription('Please detail your complaint so that a server moderator will come to take care of it.')
                    .setFooter('DevFr Support')
                    c.send({embeds: [plainte], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `<:2003on:912015084405014558> Your ticket has been successfully opened. <#${c.id}>`, ephemeral: true})
                })
            } else if (interaction.values[0] == "recruitment") {
                interaction.guild.channels.create(`ticket of ${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${catégorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new MessageEmbed()
                    .setTitle('Ticket to apply for recruitment')
                    .setDescription('Please detail your application so that a server moderator will come to take charge.')
                    .setFooter('DevFr Support')
                    c.send({embeds: [embed], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `<:2003on:912015084405014558> Your ticket has been successfully opened. <#${c.id}>`, ephemeral: true})
                })
                
            
                
            
            }
        }
    }
}
```

## How to start ?
```bash
node index.js # To start the ticket-bot
```

## Many thanks to the people who will put a ⭐!
