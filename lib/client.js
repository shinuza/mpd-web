var mpd = require('../../mpd.js')
  , parsing = require('./parsing.js');

var client = module.exports = new mpd({
  port: 6600,
  host: 'bejita.local'
});

/**
 * Playback commands
 */

client.previous = function previous(fn) {
  client.sendCommand('previous', fn);
};

client.next = function next(fn) {
  client.sendCommand('next', fn);
};

client.pause = function pause(pause, fn) {
  client.sendCommand('pause', [pause], fn);
};

client.stop = function stop(fn) {
  client.sendCommand('stop', fn);
};

client.seekcur = function seekcur(pos, fn) {
  client.sendCommand('seekcur', [pos], fn);
};

/**
 * Status commands
 */

client.status = function status(fn) {
  client.sendCommand('status', function(err, data) {
    fn(err, parsing.hash(data));
  });
};

client.currentsong = function status(fn) {
  client.sendCommand('currentsong', function(err, data) {
    fn(err, parsing.hash(data));
  });
};

client.stats = function status(fn) {
  client.sendCommand('stats', function(err, data) {
    fn(err, parsing.hash(data));
  });
};

/**
 * Playlist commands
 */

client.playlist = function playlist(fn) {
  client.sendCommand('playlistid', function(err, data) {
    fn(err, parsing.playlist(data));
  });
};
