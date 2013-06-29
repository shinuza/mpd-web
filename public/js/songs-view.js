;(function(win) {

  win.App = win.App || {};

  App.SongsView = App.HiddeableView.extend({

    events: {
      'click .group': 'showGroup'
    },

    el: '.groups',

    initialize: function initialize() {
      this.$list = this.$('.list');
      this.collection.fetch();
    },

    showGroup: function showGroup(e) {
      var $target = $(e.currentTarget);
      var group = $target.data('group');
      var groups = this.collection.groupBy(group);

      _.each(groups, function(value, key) {
        this.$list.append($('<div class="strong"></div>').text(key));
        _.each(value, function(v) {
          var $t = $('<div></div>').text(v.get('Title'));
          this.$list.append($t);
        }, this);
      }, this);
    }

  });

}(window));