;(function(win) {

  win.App = win.App || {};

  var DOM_DRAG = 'domDrag';

  App.ProgressView = Backbone.View.extend({

    el: '.progress',

    initialize: function initialize(options) {
      var self = this;

      this.$elapsed = this.$('.progress-elapsed');
      this.$time = this.$('.progress-time');
      this.$bar = this.$('.progress-bar');
      this.$bar.simpleSlider();

      this.statusModel = options.statusModel;
      this.songModel = options.songModel;

      this.setup();
    },

    setup: function() {
      this.$bar.bind("slider:changed", this.onSliderChanged.bind(this));

      this.statusModel.on('change:elapsed', function(model, elapsed) {
        this.onRatioChanged(model, elapsed);
        this.onElapsedChanged(model, elapsed);
      }, this);

      this.songModel.on('change:Time', this.onTimeChanged, this);
    },

    onSliderChanged: function onSliderChanged(event, data) {
      if(data.trigger == DOM_DRAG) {
        this.seekCur(data.ratio);
      }
    },

    onRatioChanged: function onRationChanged(model, elapsed) {
      var time = model.get('time');
      var length = time.split(':')[1];

      this.setRatio(elapsed / length);
    },

    onElapsedChanged: function onElapsedChanged(model, elapsed) {
      this.$elapsed.html(parseText(elapsed).join(':'));
    },

    onTimeChanged: function onTimeChanged(model, time) {
      this.$time.html(parseText(time).join(':'));
    },

    setRatio: function setRatio(ratio) {
      this.$bar.simpleSlider('setRatio', ratio);
    },

    seekCur: function seekCur(ratio) {
      var pos = this.songModel.getTime(ratio);

      $.ajax({
        type: 'post',
        url: '/seekcur',
        data: {pos: pos}
      });
    }


  });

}(window));