;(function(win) {

  win.App = win.App || {};

  App.SongModel = Backbone.Model.extend({

    initialize: function initialize() {
      var self = this
        , ws = new WebSocket('ws://localhost:3000/currentsong');

      ws.addEventListener('message', function(e) {
        self.set(JSON.parse(e.data));
      });
    },

    toInt: function toInt(number) {
      return parseInt(number, 10);
    },

    getTime: function getTime(ratio) {
      var time = this.get('Time');
      return this.toInt(ratio ? ratio * time : time);
    }

  });


}(window));