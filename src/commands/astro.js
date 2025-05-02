const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');

const {fetchForecast} = require('../requests/forecast');

const data  = new SlashCommandBuilder()
    .setName('astro')
    .setDescription('Replies with the astronomical forecast!')
    .addStringOption(option =>{
        return option.setName('location')
        .setDescription('The location can be a city , zip/postal code opr a latitude and longitutde.')
        .setRequired(true);

    });

    async function execute(interaction){

        try {
        await interaction.deferReply();
        const location = interaction.options.getString('location');
        const {weatherData, locationName}  = await fetchForecast(location);

        const embed = new EmbedBuilder()
            .setColor(0x3f704d)
            .setTitle(`Astronomical Forecast for ${locationName}...`)
            .setTimestamp()
            .setFooter({
                text : 'Powered by weatherapi.com API',
            });

        for (day of weatherData)
            {
                
                embed.addFields({
                    name : day.date,
                    value : `🌅 Sunrise : ${day.sunriseTime}\n🌇 Sunset : ${day.sunsetTime}\n🌔 Moonrise : ${day.moonriseTime}\n🌘 Moonset : ${day.moonsetTime}`,
                });
                
            }            

        await interaction.editReply({
            embeds : [embed]
        });
      }
      catch(error){
        await interaction.editReply;
      }
    }

    module.exports ={
        data,
        execute,
    }

