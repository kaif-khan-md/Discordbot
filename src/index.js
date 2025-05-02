require('dotenv').config();
const { Client,
    Events,
    Collection,
    GatewayIntentBits,
              }  = require('discord.js');

const {clientReadyHandler} = require('./events/clientReady');

const {interactionCreateHandler} = require('./events/interactionCreate');

const pingCommand  = require('./commands/ping');
const astroCommand  = require('./commands/astro');
const forecastCommand = require('./commands/forecast');

const client  = new Client({
    intents : [
        GatewayIntentBits.Guilds,
    ]
 });



client.commands = new Collection();

client.commands.set(pingCommand.data.name,pingCommand);
client.commands.set(forecastCommand.data.name,forecastCommand);
client.commands.set(astroCommand.data.name,astroCommand);



client.once(Events.ClientReady, clientReadyHandler);

client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(process.env.DISCORD_TOKEN);