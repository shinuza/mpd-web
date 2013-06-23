var matcher = /^([\w-]+)\:\s(.*)$/
  , EOL = '\n';

/**
 * Parse mpd hash looking string into an object
 *
 * @param str
 * @returns {{}}
 */

exports.hash = function hash(str) {
  var data = {}
    , parsed;

  if(str) {
    str.split(EOL).forEach(function(line) {
      parsed = exports.line(line);
      if(parsed) {
        data[parsed[0]] = parsed[1];
      }
    });
  }

  return data;
};

exports.playlist = function playlist(str) {
  var parsed
    , data = [];

  if(str) {
    str.split(EOL).forEach(function(line) {
      parsed = exports.line(line);
      if(parsed) {
        if(parsed[0] === 'file') {
          data.push({});
        }
        data[data.length - 1][parsed[0]] = parsed[1];
      }
    });
  }


  return data;
};

exports.line = function line(line) {
  var data = null
    , match = line.match(matcher);

  if(match === null) {
    if(line != '') {
      console.warn(line);
    }
  } else {
    data = match.slice(1);
  }

  return data;
};