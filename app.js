
/**
 * Module dependencies.
 */

var express = require('express')
  , cons = require('consolidate')
  , http = require('http')
  , path = require('path')
  , swig = require('swig')
  , ws = require('ws')
  , client = require('./lib/client.js')
  , parsing = require('./lib/parsing.js')
  , routes = require('./lib/routes.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', cons.swig);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  swig.init({ cache: false });
}

routes(app, client);

client.on('ready', function() {
  var server = http.createServer(app)
    , wss = new ws.Server({server: server});

  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  wss.on('connection', function(ws) {
    var command = ws.upgradeReq.url.replace('/', '')
      , commandPolling = (function() {
        client[command](function(err, data) {
          ws.send(JSON.stringify(data));
        });
      })
      , id = setInterval(commandPolling, 500);

    ws.on('close', function() {
      clearInterval(id);
    });

  });
});

client.connect();