module.exports = {
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
      interaction.reply('disabled')
  }
}