module.exports = {
  name: 'voice',
  description: 'Voice channel commands.',
  cooldown: false,
  testOnly: true,
  options: [
    {
      name: 'join',
      description: 'Joins a voice channel',
      type: 1,
      options: [
        {
          name: 'channel',
          description: 'The channel I should join',
          type: 3
        }
      ]
    }
  ],
  callback: ({ message, channel, client, interaction, args }) => {
    const guild = client.guilds.cache.get(interaction.guild_id)
    const member = guild.members.cache.get(interaction.member.user.id);
    const voiceChannel = member.voice.channel;
    interaction.reply('disabled')
  }
}