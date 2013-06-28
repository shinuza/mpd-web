module.exports = function(app, client) {

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

  app.get('/collection', function(req, res, next) {
    client.collection(function(err, songs) {
      if(err) {
        next(err);
      } else {
        res.json(songs);
      }
    });
  });

  app.get('/playlist', function(req, res, next) {
    client.playlist(function(err, playlist) {
      if(err) {
        next(err);
      } else {
        res.json(playlist);
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

  app.post('/playid', function (req, res, next) {
    client.playid(req.body.id, function(err) {
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

  app.post('/stop', function(req, res, next) {
    client.stop(function(err) {
      if(err) {
        next(err);
      } else {
        res.json(202, {ok: true});
      }
    });
  });
};