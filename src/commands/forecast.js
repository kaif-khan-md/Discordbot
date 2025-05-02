const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');

const {fetchForecast} = require('../requests/forecast');

const data  = new SlashCommandBuilder()
    .setName('forecast')
    .setDescription('Replies with the weather forecast!')
    .addStringOption(option =>{
        return option.setName('location')
        .setDescription('The location can be a city , zip/postal code opr a latitude and longitutde.')
        .setRequired(true);

    })
    .addStringOption(option =>{
        return option.setName('units')
        .setDescription('The unit system of the results : either metric or imperial.')
        .setRequired(false)
        .addChoices(
            {
                name : 'Metric',value :'metric'
            },
            {
                name:'Imperial',value : 'imperial'
            },
        );

    });

    async function execute(interaction){

        try {
        await interaction.deferReply();
        const location = interaction.options.getString('location');
        const units = interaction.options.getString('units') || 'metric';
        const isMetric = units === 'metric';
        const {weatherData, locationName}  = await fetchForecast(location);

        const embed = new EmbedBuilder()
            .setColor(0x3f704d)
            .setTitle(`Weather Forecast for ${locationName}...`)
            .setDescription(`using the ${units} system.`)
            .setTimestamp()
            .setFooter({
                text : 'Powered by weatherapi.com API',
            });

        for (day of weatherData)
            {
                const tempMin = isMetric? day.temperatureMinC : day.temperatureMinF;
                const tempMax = isMetric? day.temperatureMaxC : day.temperatureMaxF;

                embed.addFields({
                    name : day.date,
                    value : `⬇️ Low : ${tempMin},⬆️ High : ${tempMax}`,
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

