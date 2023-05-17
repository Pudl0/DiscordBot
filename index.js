//Import Anweisungen. Hier werden die Config Datei und die discord.js library eingebunden
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const config = require("./config.json");

//Erzeugung eines discord.js clients mit den notwendigen Berechtigungen
const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMembers,
],
});

//Dieses Event wird aufgerufen, sobald der Bot gestartet ist
client.on('ready', () => console.log(client.user.username + ' is online'));

//Dieses Event reagiert auf /Commands
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

//Dieser Befehl loggt den Bot ein. Dafür benötigst du den Token aus der config.json Datei
client.login(config.token);