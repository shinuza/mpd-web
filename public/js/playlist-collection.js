;(function(win) {

  win.App = win.App || {};

  App.PlaylistCollection = Backbone.Collection.extend({

    url: '/playlist'

  });


}(window));