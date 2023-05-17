const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    //Hier werden die Eigenschaften des Commands definiert
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
    //Hier wird definiert, was der Bot ausführen soll wenn das Command aktiviert wird
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
