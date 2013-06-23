var matcher = /^([\w-]+)\:\s(.*)$/
  , EOL = '\n'
  , EMPTY = ''
  , DIRECTORY = 'directory'
  , FILE = 'file';

/**
 * Parse mpd hash looking string into an object
 *
 * @param {String} str
 * @returns {Object}
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

/**
 * Parses a playlist like string and returns
 * a list of objects
 *
 * @param {String} str
 * @returns {Array}
 */

exports.playlist = function playlist(str) {
  var parsed
    , data = [];

  if(str) {
    str.split(EOL).forEach(function(line) {
      parsed = exports.line(line);
      // Do not process `directory` lines
      if(parsed && parsed[0] !== DIRECTORY) {
        // Create a new object and append it to
        // the list everytime we see a `file` line
        if(parsed[0] === FILE) {
          data.push({});
        }
        data[data.length - 1][parsed[0]] = parsed[1];
      }
    });
  }

  return data;
};

/**
 * Matches the string against the matcher,
 * returns a tuple if it matches, null otherwise
 *
 * @param {String} str
 * @returns {Array}
 */

exports.line = function line(str) {
  var data = null
    , match = str.match(matcher);

  // If the line is not matched print it out,
  // except if line is an empty string
  if(match === null) {
    if(str != EMPTY) {
      console.warn(str);
    }
  } else {
    data = match.slice(1);
  }

  return data;
};