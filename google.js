const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  const googleIt = require("google-it");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("web-google")
      .setDescription("🔍 → Buscador de Google")
      .addStringOption((option) =>
        option
          .setName("busqueda")
          .setDescription("Ingresa lo que deseas buscar")
          .setRequired(true)
      ),
    //.setDMPermission(false)
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
      const query = interaction.options.getString("busqueda");
      const { user: author } = interaction;
  
      try {
        const results = await googleIt({ query });
        let index = 0;
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `${client.user.username}`,
            iconURL: `${client.user.displayAvatarURL()}`,
          })
          .setThumbnail(
            "https://quoly.com/wp-content/uploads/2016/09/Google_-G-_Logo.svg_.png"
          )
          .setTitle(`Resultados de Google para \`\`\`${query}\`\`\``)
          .setColor("4285F4")
          .setTimestamp()
          .setFooter({
            text: `${author.username}`,
            iconURL: author.displayAvatarURL(true),
          })
          .setDescription(
            results
              .slice(0, 5)
              .map(
                (result) => `**${++index}** - [${result.title}](${result.link})`
              )
              .join("\n")
          );
  
        await interaction.reply({ embeds: [embed] });
      } catch (e) {
        interaction.reply({
          content:
            "<:emoji_8:1231151565038161951> **[GoogleError]** Busqueda no encontrada",
          ephemeral: true,
        });
        console.log(e);
      }
    },
  };
  