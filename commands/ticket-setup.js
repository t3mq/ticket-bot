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
					.setPlaceholder('Séléctioner le type de ticket à crée.')
					.addOptions([
						{
							label: '🤝 | Partenariat',
							description: 'Ouvre un ticket partenariat.',
							value: 'partenariat',
						},
						{
							label: '📛 | Plainte',
							description: 'Ouvre un ticket de plainte',
							value: 'plainte',
						},
                        {
							label: '👥 | Recrutement',
							description: 'Ouvre un ticket pour faire une demande de recrutement',
							value: 'recrutement',
						},
					]),
			);

        message.channel.send({
            embeds: [{
                title: 'Ouvrir un ticket',
                description: '**__Comment Ouvrir Un Ticket :__**\nVeillez choisir le type de ticket que vous souhaitez ouvrir.',
                color: "BLURPLE",
                footer: {text: 'DevFr Support'}
            }],
            components: [row]
        })
    }
}