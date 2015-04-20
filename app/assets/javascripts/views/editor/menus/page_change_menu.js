ClixrIo.Views.PageChangeMenu = Backbone.View.extend({
  template: JST['editor/menus/page_change_menu'],
  className: 'page-select',

  events: {
    'click': 'pageSelect'
  },

  initialize: function (options) {
    _.extend(this, options);
    $('nav .logo').after(this.render().$el);
    this.listenTo(this.collection, "all", this.render);
  },

  pageSelect: function (event) {
    var $selected = $(event.target);
    if (!this.$el.hasClass('expanded-menu')) {
      this.$el.addClass('expanded-menu');
    } else {
      if ($selected.prop('tagName') === 'LI') this.selectPage($selected.index());
      this.$el.removeClass('expanded-menu');
    }
  },

  render: function () {
    var content = this.template({
      pages: this.collection,
      currentPage: this.currentPage()
    });
    this.$el.html(content);
    return this;
  }
});
