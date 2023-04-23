const { Pool } = require("pg");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylistById(id) {
    const queryPlaylist = {
      text: `SELECT playlists.id, playlists.name, users.username
            FROM playlists
            INNER JOIN users
            ON users.id = playlists.owner
            WHERE playlists.id = $1 `,
      values: [id],
    };
    const playlist = await this._pool.query(queryPlaylist);

    const querySongs = {
      text: `SELECT songs.id, songs.title, songs.performer from songs
          INNER JOIN playlist_songs
          ON playlist_songs."songId" = songs.id
          WHERE playlist_songs."playlistId" = $1`,
      values: [id],
    };

    const songs = await this._pool.query(querySongs);
    return {
      playlist: {
        id: playlist.rows[0].id,
        name: playlist.rows[0].name,
        songs: songs.rows,
      },
    };
  }
}

module.exports = PlaylistsService;
