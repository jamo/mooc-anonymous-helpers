// Socket.io brigde from html interface and irc.
var irc = require('irc');

var public_channel = '#mooc.fi';
var private_channel = '#mooc.fi-anonymous-helpers';
var client = new irc.Client('irc.nebula.fi', 'SLH', {
  channels: [public_channel, private_channel],
  userName: 'Santas Little Helper',
  realName: 'Santas Little Helper',
  showErrors: false,
  autoRejoin: true
});

client.addListener('message' + private_channel, function (from, message) {
  console.log(from + ' => ' + private_channel + message);
  client.say(public_channel,  message);
});
client.addListener('message' + public_channel, function (from, message) {
  console.log(from + ' => ' + public_channel  + message);
  client.say(private_channel, '<' + from + '>: ' + message);
});
client.addListener('error', function(message) {
  console.log('error: ', message);
});
