;(function(win) {

  win.App = win.App || {};

  var DOM_DRAG = 'domDrag';

  App.ProgressView = Backbone.View.extend({

    el: '.progress',

    initialize: function initialize(options) {
      var self = this;

      this.statusModel = options.statusModel;
      this.songModel = options.songModel;

      this.$el.simpleSlider();
      this.$el.bind("slider:changed", function (event, data) {
        if(data.trigger == DOM_DRAG) {
          self.seekCur(data.ratio);
        }
      });

      this.statusModel.on('change:elapsed', this.onRatioChanged, this);
    },

    onRatioChanged: function onRationChanged(model) {
      var elapsed = model.get('elapsed');
      var time = model.get('time');
      var length = time.split(':')[1];

      this.setRatio(elapsed / length);
    },

    setRatio: function setRatio(ratio) {
      this.$el.simpleSlider('setRatio', ratio);
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