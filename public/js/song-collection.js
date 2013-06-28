;(function(win) {

  win.App = win.App || {};

  App.SongCollection = Backbone.Collection.extend({

    url: '/collection'

  });


}(window));