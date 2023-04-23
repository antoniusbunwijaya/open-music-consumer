require("dotenv").config();
const amqp = require("amqplib");
const MailSender = require("./utils/MailSender");
const Listener = require("./listener");
const PlaylistsService = require("./services/postgres/PlaylistsService");

const init = async () => {
  const playlistService = new PlaylistsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue("export:playlists", {
    durable: true,
  });

  await channel.consume("export:playlists", listener.listen, { noAck: true });
};

init();
