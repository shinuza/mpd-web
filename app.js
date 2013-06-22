
/**
 * Module dependencies.
 */

var express = require('express')
  , cons = require('consolidate')
  , http = require('http')
  , path = require('path')
  , swig = require('swig')
  , ws = require('ws')
  , client = require('./lib/client.js');

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

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/status', function(req, res, next) {
  client.status(function(err, status) {
    if(err) {
      next(err);
    } else {
      res.json(status);
    }
  });
});

app.get('/currentsong', function(req, res, next) {
  client.currentsong(function(err, song) {
    if(err) {
      next(err);
    } else {
      res.json(song);
    }
  });
});

app.post('/play', function(req, res, next) {
  client.play(function(err) {
    if(err) {
      next(err);
    } else {
      res.json(202, {ok: true});
    }
  });
});

app.post('/pause', function(req, res, next) {
  client.pause(req.body.pause, function(err) {
    if(err) {
      next(err);
    } else {
      res.json(202, {ok: true});
    }
  });
});

app.post('/stop', function (req, res, next) {
  client.stop(function(err) {
    if(err) {
      next(err);
    } else {
      res.json(202, {ok: true});
    }
  });
});

app.post('/previous', function (req, res, next) {
  client.previous(function(err) {
    if(err) {
      next(err);
    } else {
      res.json(202, {ok: true});
    }
  });
});

app.post('/next', function (req, res, next) {
  client.next(function(err) {
    if(err) {
      next(err);
    } else {
      res.json(202, {ok: true});
    }
  });
});

app.post('/seekcur', function(req, res, next) {
  client.seekcur(req.body.pos, function(err) {
    if(err) {
      next(err);
    } else {
      res.json(202, {ok: true});
    }
  });
});

client.on('ready', function() {
  var server = http.createServer(app);
  server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  var wss = new ws.Server({server: server});
  wss.on('connection', function(ws) {

    var command = ws.upgradeReq.url.replace('/', '');

    var id = setInterval(function() {
      client[command](function(err, data) {
        ws.send(JSON.stringify(data));
      });
    }, 500);

    ws.on('close', function() {
      clearInterval(id);
    });
  });
});

client.connect();