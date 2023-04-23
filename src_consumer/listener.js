class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const playlist = await this._playlistsService.getSongsFromPlaylistById(playlistId);
      await this._mailSender.sendMail(targetEmail, JSON.stringify(playlist));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
