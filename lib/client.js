var mpd = require('../../mpd.js');
var matcher = /^([\w-]+)\:\s(.*)$/;

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
    fn(err, parse(data));
  });
};

client.currentsong = function status(fn) {
  client.sendCommand('currentsong', function(err, data) {
    fn(err, parse(data));
  });
};

client.stats = function status(fn) {
  client.sendCommand('stats', function(err, data) {
    fn(err, parse(data));
  });
};

/**
 * Parse mpd hash looking string into an object
 *
 * @param str
 * @returns {{}}
 */

function parse(str){
  var data = {};

  if(!str) return data;

  str.split('\n').forEach(function(line) {
    var match = line.match(matcher);
    if(match === null) {
      if(line != '') {
        console.warn(line);
      }
    } else {
      data[match[1]] = match[2];
    }
  });

  return data;
}