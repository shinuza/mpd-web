var $playback = $('.playback');
var $previous = $('.previous');
var $next = $('.next');
var $progress = $('.progress-line');
var $progressBar = $('.progress-bar');
var $time = $('.progress-time');
var $elapsed = $('.progress-elapsed');

var Playback = null;
var Song = null;
var Status = null;

function pad(nb) {
  if(nb < 10) {
    return '0' + nb;
  }
  return nb;
}

function timeToText(time) {
  if(!time) {
    return '--:--';
  }
  var divided = Number(time) / 60
    , min = Math.floor(divided)
    , seconds = Math.floor((divided - min) * 60);

  return [pad(min), pad(seconds)].join(':');
}

function onStateChange(isPaused) {
  $playback.empty().html(isPaused ? '[  > ]' : '[ || ]');
  Playback = +isPaused;
}

function onTrackChange(currentSong) {
  var html = currentSong.Artist ? [currentSong.Artist, currentSong.Title].join(' - ') : '';
  $('.title').html(html);
}

function onProgressChange() {
  $progress.animate({'width': (Status.elapsed / Song.Time * 100) + '%'});
}

function onTimeChange() {
  $time.html(timeToText(Song.Time));
}

function onElapsedChange() {
  $elapsed.html(timeToText(Status.elapsed));
}
var songModel = new App.SongModel;
new App.SongView({model: songModel});

var statusModel = new App.StatusModel;
new App.ControlsView({model: statusModel});

new App.ProgressView({songModel: songModel, statusModel: statusModel});