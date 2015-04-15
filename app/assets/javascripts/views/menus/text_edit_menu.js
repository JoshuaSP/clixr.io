ClixrIo.Views.TextEditMenu = Backbone.View.extend(
  _.extend({}, ClixrIo.Mixins.EditElementMenu, ClixrIo.Mixins.MenuUtils, {
    template: JST['menus/text_edit_menu'],

    events: {
      'click .site-page-toggle': 'sitePageToggle',
      'click .delete-button': 'deleteElement',
      'click .fa-close': 'close'
    },

    initialize: function (options) {
      _.extend(this, options);
      $('.floating-menus').append(this.render().$el);
      this.overlappingItems();
      var $textbox = this.$targetEl.find('.text-content');
      this.toolbar = new ClixrIo.Views.TextEditToolbar({
        $textbox: $textbox
      });
      this.setupSubmenus(this.$el, {
        '.overlapping-button': '.overlapping-items',
        '.toolbar-button': '#wysihtml5-toolbar'
      });
      this.delegateEvents();
      this.$('.toolbar-button').click(function() {
        if (this.toolbar.isVisible()) {
          this.$targetEl.draggable();
          $textbox.attr("contenteditable", "false");
        } else {
          this.$targetEl.draggable('destroy');
          $textbox.attr("contenteditable", "true");
          $('a[data-wysihtml5-command-value="p"]')[0].click();
        }
      }.bind(this));
    },

    overlapListen: function () {
      this.$targetEl.find('.text-content').on('keyup', function () {
        this.overlappingItemsMenu.render();
      }.bind(this));
    },

    remove: function () {
      setTimeout(function() {
        this.toolbar.remove();
        this.toolbar = null;
      }.bind(this), 200);
      this.toolbar.css('opacity', 0);
      if (this.toolbar.isVisible()) this.$el.draggable('destroy');
      this.$targetEl.find('.text-content').off();
      ClixrIo.Mixins.EditElementMenu.remove.apply(this);
    },

    render: function () {
      var content = this.template({
        global: this.global()
      });
      this.$el.html(content);
      return this;
    },
  })
);
