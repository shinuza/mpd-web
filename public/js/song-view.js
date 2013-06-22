;(function(win) {

  win.App = win.App || {};

  App.SongView = Backbone.View.extend({

    el: '.song',

    template: _.template('<%= Artist %> - <%= Title %>'),

    initialize: function initialize() {
      this.$title = $('title');

      this.model.on('change', this.render, this);
    },

    render: function render(model) {
      var text = this.template(model.attributes);
      this.$el.html(text);
      this.$title.html(text);
    }

  });

}(window));