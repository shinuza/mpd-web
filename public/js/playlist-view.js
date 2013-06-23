;(function(win) {

  win.App = win.App || {};

  App.PlaylistView = Backbone.View.extend({

    el: '.playlist',

    events: {
      'click tr': 'onSongClick'
    },

    template: _.template(
      '<tr data-id="<%= Id %>">' +
        '<td><%= Track %></td>' +
        '<td><%= Title %></td>' +
        '<td><%= parseTime(Time).join(\':\') %></td>' +
        '<td><%= Artist %></td>' +
      '</tr>'
    ),

    initialize: function initialize() {
      this.$body = this.$('tbody');

      this.collection.on('sync', this.renderAll, this);
      this.collection.fetch();
    },

    render: function render(model) {
      var $line = $(this.template(model.toJSON()));
      this.$body.append($line);
    },

    renderAll: function renderAll(collection) {
      this.$body.empty();
      collection.each(this.render, this);
    },

    onSongClick: function onSongClick(e) {
      var $el = $(e.currentTarget);
      $.ajax({
        type: 'post',
        url: '/playid',
        data: {id: $el.data('id')}
      });
    }

  });

}(window));