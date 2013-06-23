var fs = require('fs')
  , path = require('path')
  , assert = require('chai').assert
  , parsing = require('../lib/parsing.js');

suite('ListallInfo', function(){
  setup(function(){
    this.content = fs.readFileSync(path.resolve(__dirname, 'fixtures', 'listallinfo.txt'));
  });

  test('content type', function() {
    var content = this.content.toString();
    assert.typeOf(content, 'string');
  });

  test('resulting array length', function() {
    var content = this.content.toString();
    var parsed = parsing.playlist(content);
    assert.equal(parsed.length, 1563);
  });

});
