const {MessageActionRow, MessageSelectMenu} = require('discord.js')
module.exports = {
    name: 'ticket',
    usage: 'template',
    category: "mod",
    description: `Commande template.`,
    async execute(client, message, args) {
		message.delete()
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select the type of ticket to create.')
					.addOptions([
						{
							label: '🤝 | Partner',
							description: 'Open a partnership ticket.',
							value: 'partenariat',
						},
						{
							label: '📛 | Complaint',
							description: 'Open a complaint ticket ',
							value: 'plainte',
						},
                        {
							label: '👥 | Recruitment',
							description: 'Open a ticket to apply for recruitment',
							value: 'recrutement',
						},
					]),
			);

        message.channel.send({
            embeds: [{
                title: 'Open ticket',
                description: '**__How To Open A Ticket :__**\nPlease choose the type of ticket you wish to open.',
                color: "BLURPLE",
                footer: {text: 'DevFr Support'}
            }],
            components: [row]
        })
    }
}
