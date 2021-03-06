function pad(nb) {
  if(nb < 10) {
    return '0' + nb;
  }
  return nb;
}

function parseTime(time) {
  if(!time) {
    return '--:--';
  }
  var divided = Number(time) / 60
    , min = Math.floor(divided)
    , seconds = Math.floor((divided - min) * 60);

  return [pad(min), pad(seconds)];
}

function toInt(number) {
  return parseInt(number, 10);
}


var currentSongModel = new App.CurrentSongModel;
new App.CurrentSongView({model: currentSongModel});

var statusModel = new App.StatusModel;
new App.ControlsView({model: statusModel});

new App.ProgressView({songModel: currentSongModel, statusModel: statusModel});

var playlistCollection = new App.PlaylistCollection;
App.playlistView = new App.PlaylistView({collection: playlistCollection});

var songsCollection = new App.SongsCollection;
App.songsView = new App.SongsView({collection: songsCollection});

App.viewport = new App.ViewPort();
var router = new App.Router();

Backbone.history.start();