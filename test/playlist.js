var fs = require('fs')
  , path = require('path')
  , assert = require('chai').assert
  , parsing = require('../lib/parsing.js');

suite('Playlist', function(){
  setup(function(){
    this.content = fs.readFileSync(path.resolve(__dirname, 'fixtures', 'playlist.txt'));
  });

  test('content type', function() {
    var content = this.content.toString();
    assert.typeOf(content, 'string');
  });

  test('resulting array length', function() {
    var content = this.content.toString();
    var parsed = parsing.playlist(content);
    assert.equal(parsed.length, 14);
  });

  test('results keys', function() {
    var content = this.content.toString();
    var parsed = parsing.playlist(content);
    assert.deepEqual(Object.keys(parsed[0]), [
      'file',
      'Last-Modified',
      'Time',
      'Album',
      'Artist',
      'Date',
      'Genre',
      'Title',
      'Track',
      'Pos',
      'Id'
    ]);
  });
});
