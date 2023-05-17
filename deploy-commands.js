const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

//Hier erstellen wir eine leere Liste für die Commands
client.commands = new Collection();

//Hier werden alle .js Dateien in dem Ordner Commands durchsucht und die Commands in die Liste hinzugefügt.
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

//hier werden alle Unterordner und Dateien des Command-Ordners durchsucht. Jedes gefundene Command wird der erstellten Liste hinzugefügt.
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


// Erzeugt eine Instanz des REST Moduls und deployed die Commands
const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Hier werden die Commands bei jedem durchführen der Methode aktualisiert
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
