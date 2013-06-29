;(function(win) {

  win.App = win.App || {};

  App.Router = Backbone.Router.extend({

    routes: {
      "playlist": "playlist",
      "songs": "songs"
    },

    playlist: function playlist() {
      App.songsView.hide();
      App.viewport.setView(App.playlistView.show());
    },

    songs: function songs() {
      App.playlistView.hide();
      App.viewport.setView(App.songsView.show());
    }

  });

}(window));

