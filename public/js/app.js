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


var songModel = new App.SongModel;
new App.SongView({model: songModel});

var statusModel = new App.StatusModel;
new App.ControlsView({model: statusModel});

new App.ProgressView({songModel: songModel, statusModel: statusModel});

var playlistCollection = new App.PlaylistCollection;
new App.PlaylistView({collection: playlistCollection});