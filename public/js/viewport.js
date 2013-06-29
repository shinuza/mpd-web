;(function(win) {

  win.App = win.App || {};

  App.ViewPort = Backbone.View.extend({

    el: '.viewport',

    setView: function(view) {
      this.$el.empty().append(view);
    }

  });

}(window));